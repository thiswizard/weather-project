import { useState } from 'react'
import { useRouter } from 'next/router'
import {Box , Button , TextField , Typography , Container} from '@mui/material'



export default function Login() {
  const [email , setEmail] = useState<string>('')
  const [password , setPassword] = useState<string>('')
  const router = useRouter() // 페이지 이동을 위한 useRouter 훅 사용

  const handleLogin = (e: React.FormEvent) => { // 로그인 버튼을 눌렀을떄 행동
    e.preventDefault();
    console.log('Logging in with:', { email, password });
    router.push('/weather');  

    // 추가 작성 필요
  };

  const handleSignupRedirect = () => { // 회원가입 버튼을 눌렀을떄 행동
    router.push('/signup'); // 회원가입 페이지로 이동
  };


  return (
    <Container maxWidth="sm">
      <Box sx={{
        mt: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>

      <Typography
      variant='h4'
      component='h1'
      gutterBottom>
        로그인
      </Typography>

      <Box component='form' onSubmit={handleLogin} sx={{mt:1 , width:'100%'}}>
        <TextField 
          fullWidth
          required
          margin='normal'
          label='아이디(이메일)'
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField 
        fullWidth
        required
        margin='normal'
        label='비밀번호'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          sx={{mt:3}}
        > 로그인 </Button>
        <Button
        fullWidth
        variant='outlined'
        color='success'
        sx={{mt: 2}}
        onClick={handleSignupRedirect}
        > 회원가입 </Button>
      </Box>
      </Box>
    </Container>
  );
}

