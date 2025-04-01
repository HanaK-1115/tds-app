const DEPARTMENTS = require('../../shared/constants/departments');
const ROLES = require('../../shared/constants/roles');
const { sequelize } = require('../src/models');

async function seedMasterData() {
  let transaction;
  
  try {
    console.log('マスターデータを挿入中...');
    console.log('読み込んだ定数ファイル:');
    console.log('- 部署:', Object.keys(DEPARTMENTS).length, '件');
    if (Object.keys(DEPARTMENTS).length === 0) {
      console.error('警告: 部署データが空です');
    } else {
      console.log('  サンプル:', Object.keys(DEPARTMENTS)[0], DEPARTMENTS[Object.keys(DEPARTMENTS)[0]]);
    }
    
    console.log('- 役職:', ROLES ? Object.keys(ROLES).length : 0, '件');
    if (!ROLES || Object.keys(ROLES).length === 0) {
      console.error('警告: 役職データが空または未定義です');
    } else {
      console.log('  サンプル:', Object.keys(ROLES)[0], ROLES[Object.keys(ROLES)[0]]);
    }
    
    // データの構造確認
    if (DEPARTMENTS) {
      const deptSample = DEPARTMENTS[Object.keys(DEPARTMENTS)[0]];
      if (!deptSample || typeof deptSample.id === 'undefined' || typeof deptSample.name === 'undefined') {
        console.error('警告: 部署データの構造が正しくありません。id と name プロパティが必要です。');
        console.log('データ構造:', deptSample);
      }
    }
    
    if (ROLES) {
      const roleSample = ROLES[Object.keys(ROLES)[0]];
      if (!roleSample || typeof roleSample.id === 'undefined' || typeof roleSample.name === 'undefined') {
        console.error('警告: 役職データの構造が正しくありません。id と name プロパティが必要です。');
        console.log('データ構造:', roleSample);
      }
    }
    
    // トランザクション開始
    transaction = await sequelize.transaction();
    
    try {
      // テーブル存在確認
      console.log('テーブル存在確認中...');
      
      const checkTable = async (tableName) => {
        const [result] = await sequelize.query(`
          SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_name = '${tableName}'
          ) as exists;
        `, { transaction });
        return result[0].exists;
      };
      
      const hasDepartmentsTable = await checkTable('departments');
      const hasRolesTable = await checkTable('roles');
      
      console.log('- departments テーブル:', hasDepartmentsTable ? '存在します' : '存在しません');
      console.log('- roles テーブル:', hasRolesTable ? '存在します' : '存在しません');
      
      if (!hasDepartmentsTable || !hasRolesTable) {
        console.error('エラー: 必要なテーブルが存在しません。先にテーブルを作成してください。');
        await transaction.rollback();
        return;
      }
      
      // 現在のレコード数確認
      const [deptCount] = await sequelize.query('SELECT COUNT(*) FROM departments', { transaction });
      const [roleCount] = await sequelize.query('SELECT COUNT(*) FROM roles', { transaction });
      
      console.log('現在のレコード数:');
      console.log('- departments:', deptCount[0].count, '件');
      console.log('- roles:', roleCount[0].count, '件');
      
      // 部署データの挿入
      console.log('部署データを挿入中...');
      let deptInsertCount = 0;
      let deptUpdateCount = 0;
      
      for (const key in DEPARTMENTS) {
        if (!DEPARTMENTS.hasOwnProperty(key)) continue;
        
        const dept = DEPARTMENTS[key];
        if (!dept || typeof dept.id === 'undefined' || typeof dept.name === 'undefined') {
          console.warn(`警告: 不正な部署データをスキップします: ${JSON.stringify(dept)}`);
          continue;
        }
        
        // 既存レコードを確認
        const [existingDept] = await sequelize.query(
          'SELECT id FROM departments WHERE id = $1',
          { bind: [dept.id], transaction }
        );
        
        const exists = existingDept.length > 0;
        
        // 挿入または更新
        await sequelize.query(`
          INSERT INTO departments (id, name, "createdAt", "updatedAt")
          VALUES ($1, $2, NOW(), NOW())
          ON CONFLICT (id) DO UPDATE SET name = $2, "updatedAt" = NOW()
        `, {
          bind: [dept.id, dept.name],
          transaction
        });
        
        if (exists) {
          deptUpdateCount++;
          console.log(`部署を更新: ${dept.name} (ID: ${dept.id})`);
        } else {
          deptInsertCount++;
          console.log(`部署を追加: ${dept.name} (ID: ${dept.id})`);
        }
      }
      
      console.log(`部署データ: ${deptInsertCount}件追加, ${deptUpdateCount}件更新`);
      
      // 役職データの挿入
      console.log('役職データを挿入中...');
      let roleInsertCount = 0;
      let roleUpdateCount = 0;
      
      if (ROLES) {
        for (const key in ROLES) {
          if (!ROLES.hasOwnProperty(key)) continue;
          
          const role = ROLES[key];
          if (!role || typeof role.id === 'undefined' || typeof role.name === 'undefined') {
            console.warn(`警告: 不正な役職データをスキップします: ${JSON.stringify(role)}`);
            continue;
          }
          
          // 既存レコードを確認
          const [existingRole] = await sequelize.query(
            'SELECT id FROM roles WHERE id = $1',
            { bind: [role.id], transaction }
          );
          
          const exists = existingRole.length > 0;
          
          // 挿入または更新
          await sequelize.query(`
            INSERT INTO roles (id, name, "createdAt", "updatedAt")
            VALUES ($1, $2, NOW(), NOW())
            ON CONFLICT (id) DO UPDATE SET name = $2, "updatedAt" = NOW()
          `, {
            bind: [role.id, role.name],
            transaction
          });
          
          if (exists) {
            roleUpdateCount++;
            console.log(`役職を更新: ${role.name} (ID: ${role.id})`);
          } else {
            roleInsertCount++;
            console.log(`役職を追加: ${role.name} (ID: ${role.id})`);
          }
        }
      } else {
        console.warn('警告: 役職データが定義されていないため、スキップします');
      }
      
      console.log(`役職データ: ${roleInsertCount}件追加, ${roleUpdateCount}件更新`);
      
      // データ挿入後のレコード数確認
      const [newDeptCount] = await sequelize.query('SELECT COUNT(*) FROM departments', { transaction });
      const [newRoleCount] = await sequelize.query('SELECT COUNT(*) FROM roles', { transaction });
      
      console.log('挿入後のレコード数:');
      console.log('- departments:', newDeptCount[0].count, '件');
      console.log('- roles:', newRoleCount[0].count, '件');
      
      // トランザクションをコミット
      await transaction.commit();
      console.log('マスターデータの挿入が完了しました！');
      
      // データ確認
      console.log('登録されたデータを確認中...');
      
      const [departments] = await sequelize.query('SELECT id, name FROM departments ORDER BY id');
      const [roles] = await sequelize.query('SELECT id, name FROM roles ORDER BY id');
      
      console.log('== 部署データ ==');
      departments.forEach(d => console.log(`ID: ${d.id}, 名前: ${d.name}`));
      
      console.log('== 役職データ ==');
      roles.forEach(r => console.log(`ID: ${r.id}, 名前: ${r.name}`));
      
    } catch (error) {
      // エラー時はロールバック
      if (transaction) await transaction.rollback();
      console.error('トランザクションエラー:', error.message);
      throw error;
    }
  } catch (error) {
    console.error('マスターデータ挿入エラー:', error);
    if (error.original) {
      console.error('SQLエラー詳細:', error.original.message);
    }
    if (error.stack) {
      console.error('スタックトレース:', error.stack);
    }
  } finally {
    try {
      await sequelize.close();
      console.log('データベース接続を閉じました');
    } catch (closeError) {
      console.error('接続クローズエラー:', closeError);
    }
  }
}

// スクリプト実行が直接行われる場合
if (require.main === module) {
  seedMasterData().then(() => {
    console.log('スクリプト実行完了');
    process.exit(0);
  }).catch(err => {
    console.error('スクリプト実行エラー:', err);
    process.exit(1);
  });
}

module.exports = seedMasterData;