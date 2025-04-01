import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// これは将来的には共通テーマファイルに移動することをお勧めします
const theme = createTheme();

const SignUpForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // すべてのフォームフィールドを一つのstateで管理
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConfirm: '',
    lastName: '',
    firstName: '',
    departmentId: '',
    roleId: '',
    joinDate: '',
    paidLeaveDays: ''
  });
  
  // フィールドごとのエラーを管理
  const [errors, setErrors] = useState({});

  // フィールド変更時のハンドラー（すべてのテキストフィールドで共通）
  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    
    // 入力があればそのフィールドのエラーをクリア
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };
  
  // パスワード強度のチェック
  const checkPasswordStrength = (password) => {
    // パスワードは最低8文字で、少なくとも1つの数字、1つの大文字、1つの小文字を含む
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
  };
  
  // フォームのバリデーション
  const validateForm = () => {
    const newErrors = {};
    
    // 必須フィールドのチェック
    Object.entries(formData).forEach(([key, value]) => {
      if (!value && key !== 'error') {
        newErrors[key] = '必須項目です';
      }
    });
    
    // パスワード一致のチェック
    if (formData.password && formData.passwordConfirm && formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = 'パスワードが一致しません';
    }
    
    // パスワード強度のチェック
    if (formData.password && !checkPasswordStrength(formData.password)) {
      newErrors.password = 'パスワードは8文字以上で、数字、大文字、小文字を含む必要があります';
    }
    
    // 有給休暇残日数が正の数かチェック
    if (formData.paidLeaveDays && (isNaN(formData.paidLeaveDays) || Number(formData.paidLeaveDays) < 0)) {
      newErrors.paidLeaveDays = '0以上の数値を入力してください';
    }
    
    setErrors(newErrors);
    
    // エラーがなければtrue、あればfalseを返す
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // バリデーションチェック
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // APIに送信するデータを整形
      const userData = {
        username: formData.username,
        password: formData.password,
        departmentId: Number(formData.departmentId),
        lastName: formData.lastName,
        firstName: formData.firstName,
        join_date: formData.joinDate,
        remaining_leave_days: Number(formData.paidLeaveDays),
        roleId: Number(formData.roleId)
      };
      
      const response = await registerUser(userData);
      console.log('登録が成功しました。', response);
      navigate('/register-success'); // 登録完了画面に遷移
    } catch (error) {
      console.error('登録に失敗しました。', error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: error.message || '登録に失敗しました。再試行してください。'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            アカウント登録
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="ユーザー名"
                  name="username"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                  error={!!errors.username}
                  helperText={errors.username || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="パスワード"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password || '8文字以上で、数字、大文字、小文字を含む必要があります'}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordConfirm"
                  label="パスワード（確認用）"
                  type="password"
                  id="passwordConfirm"
                  autoComplete="new-password"
                  value={formData.passwordConfirm}
                  onChange={handleChange}
                  error={!!errors.passwordConfirm}
                  helperText={errors.passwordConfirm || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="姓"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label="名"
                  name="firstName"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl 
                  fullWidth 
                  required
                  error={!!errors.departmentId}
                >
                  <InputLabel id="departmentId-label">所属部署</InputLabel>
                  <Select
                    labelId="departmentId-label"
                    id="departmentId"
                    name="departmentId"
                    value={formData.departmentId}
                    label="所属部署"
                    onChange={handleChange}
                  >
                    <MenuItem value="1">本社</MenuItem>
                    <MenuItem value="2">産業機器システム開発</MenuItem>
                    <MenuItem value="3">LSI設計</MenuItem>
                    <MenuItem value="4">ソフトウェア設計</MenuItem>
                  </Select>
                  {errors.departmentId && <FormHelperText>{errors.departmentId}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl 
                  fullWidth 
                  required
                  error={!!errors.roleId}
                >
                  <InputLabel id="roleId-label">役職</InputLabel>
                  <Select
                    labelId="roleId-label"
                    id="roleId"
                    name="roleId"
                    value={formData.roleId}
                    label="役職"
                    onChange={handleChange}
                  >
                    <MenuItem value="1">管理者</MenuItem>
                    <MenuItem value="2">MNG</MenuItem>
                    <MenuItem value="3">PM</MenuItem>
                    <MenuItem value="4">ENG</MenuItem>
                    <MenuItem value="5">ST</MenuItem>
                    <MenuItem value="6">AST</MenuItem>
                  </Select>
                  {errors.roleId && <FormHelperText>{errors.roleId}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="joinDate"
                  label="入社年月日"
                  name="joinDate"
                  type="date"
                  value={formData.joinDate}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.joinDate}
                  helperText={errors.joinDate || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="paidLeaveDays"
                  label="有給休暇残日数"
                  name="paidLeaveDays"
                  type="number"
                  value={formData.paidLeaveDays}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={!!errors.paidLeaveDays}
                  helperText={errors.paidLeaveDays || '※不明や曖昧な場合は、管理者に確認お願いします。'}
                  inputProps={{ min: 0 }}
                />
              </Grid>
            </Grid>
            
            {errors.general && (
              <Typography color="error" sx={{ mt: 2 }}>
                {errors.general}
              </Typography>
            )}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              {isSubmitting ? '登録中...' : '登録'}
            </Button>
            
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  すでにアカウントをお持ちですか？サインイン
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUpForm;
