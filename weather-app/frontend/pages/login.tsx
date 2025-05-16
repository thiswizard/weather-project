import { useState } from 'react'
import { useRouter } from 'next/router'
import {Box , Button , TextField , Typography , Container} from '@mui/material'
import axios from 'axios'

export default function Login() {
  const [email , setEmail] = useState<string>('')
  const [password , setPassword] = useState<string>('')
  const router = useRouter() // 페이지 이동을 위한 useRouter 훅 사용

  const handleLogin = async (e: React.FormEvent) => { // 로그인 버튼을 눌렀을떄 행동
    e.preventDefault();
    try{
      const response = await axios.post(
        'http://localhost:3001/auth/login',{
        email,
        password
      },
      { 
        withCredentials: true, // 크로스 도메인(프론트엔드-백엔드) 요청시 쿠키나 인증정보를 함께 보냄
        // 프론트는 axios 요청에 withCredentials: true만 넣으면  쿠키가 브라우저에 저장되고 요청 시 자동 포함됨
      }
    
    )

      if(response.status === 200) {
        alert('로그인 성공!')
        router.push('/search')
      }

    }catch(error: any){
      console.error(error)
      alert('로그인에 문제가 생겼습니다')
    }
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

