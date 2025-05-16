import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import axios from 'axios';

export default function Signup() {
  const [email, setEmail] = useState<string>('');
  const [authnum, setAuthnum] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordck, setPasswordck] = useState<string>('');
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const router = useRouter(); // 페이지 이동을 위한 useRouter 훅 사용

  const sendAuthCode = async () => {
    if (!email) {
      alert('이메일을 입력해주세요');
      return; // 조기 종료를 위해 넣어야함
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/auth/send-code',
        {
          email: email,
        },
      );

      if (response.status === 200 || response.status === 201)
        alert('이메일 인증 코드가 전송되었습니다');
    } catch (error: any) {
      console.error(error);
      alert('인증 코드 전송 중 에러가 발생했습니다 관리자에게 문의해주세요');
    }
  };

  const authCodeCheck = async () => {
    if (!email || !authnum) {
      alert('이메일 하고 인증코드를 입력해주세요');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/auth/verify-code',
        {
          email: email,
          code: authnum,
        },
      );

      if (response.status === 200) {
        alert('인증이 성공적으로 완료되었습니다');
        setIsVerified(true);
      }
    } catch (error: any) {
      console.error(error);
      alert('인증 실패:코드가 올바르지 않거나 만료되었습니다');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault(); // 폼 제출시 새로고침 방지
    if (!email) {
      alert('이메일을 입력해주세요');
      return;
    }

    if (!authnum || !isVerified) {
      alert('이메일 인증을 완료해주세요');
      return;
    }

    if (!password || !passwordck) {
      alert('비밀번호 및 비밀번호 확인칸을 입력해주세요');
      return;
    }

    if (password !== passwordck) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/auth/signup', {
        email: email,
        password: password,
      });

      if (response.status === 201) alert('회원가입이 성공적으로 되었습니다');
    } catch (error: any) {
      console.error(error);
      alert('회원가입중 에러가 발생했습니다');
    }
  };

  const handleLoginRedirect = (e: React.FormEvent) => {
    router.push('/login');
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          회원가입
        </Typography>

        <Box
          component="form"
          onSubmit={handleSignup}
          sx={{ mt: 1, width: '100%' }}
        >
          <TextField
            fullWidth
            required
            margin="normal"
            label="아이디(이메일)"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            required
            margin="normal"
            label="이메일 인증번호"
            type="string"
            value={authnum}
            onChange={(e) => setAuthnum(e.target.value)}
          />
          <TextField
            fullWidth
            required
            margin="normal"
            label="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            required
            margin="normal"
            label="비밀번호 확인"
            type="text"
            value={passwordck}
            onChange={(e) => setPasswordck(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={sendAuthCode}
          >
            {' '}
            인증 코드 전송{' '}
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
            onClick={authCodeCheck}
          >
            {' '}
            인증 코드 확인{' '}
          </Button>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSignup}
          >
            {' '}
            회원가입{' '}
          </Button>

          <Button
            fullWidth
            variant="outlined"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleLoginRedirect}
          >
            {' '}
            로그인 페이지 이동{' '}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
