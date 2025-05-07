import { useState } from 'react'
import { useRouter } from 'next/router'
import {Box , Button , TextField , Typography , Container} from '@mui/material'



export default function Signup() {
  const [email , setEmail] = useState<string>('')
  const [authnum , setAuthnum] = useState<string>('')
  const [password , setPassword] = useState<string>('')
  const [passwordck , setPasswordck] = useState<string>('')
  const router = useRouter() // 페이지 이동을 위한 useRouter 훅 사용

  const handleSignup = (e: React.FormEvent) => { 
    e.preventDefault();
    
    // 추가 작성 필요
  };

  const handleLoginRedirect = () => { 
    router.push('/login')
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
        회원가입
      </Typography>

      <Box component='form' onSubmit={handleSignup} sx={{mt:1 , width:'100%'}}>
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
        label='이메일 인증번호'
        type='number'
        value={authnum}
        onChange={(e) => setAuthnum(e.target.value)}
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
        <TextField 
        fullWidth
        required
        margin='normal'
        label='비밀번호 확인'
        type='text'
        value={passwordck}
        onChange={(e) => setPasswordck(e.target.value)}
        />

        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
          sx={{mt:3}}
        > 전송 </Button>

        <Button
        fullWidth
        variant='contained'
        color='primary'
        sx={{mt: 2}}
        onClick={handleLoginRedirect}
        > 로그인 </Button>

      </Box>
      </Box>
    </Container>
  );
}

