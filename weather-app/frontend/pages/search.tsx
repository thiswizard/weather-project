import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import axios from 'axios';

export default function SearchPage() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState<any[]>([]);



  // 도시 -> 격자 좌표 변환
  const getGridXY = (location: string) => {
    const map: Record<string, { nx: number; ny: number }> = {
      '서울': { nx: 60, ny: 127 },
      '부산': { nx: 98, ny: 76 },
      '대구': { nx: 89, ny: 90 },
      '인천': { nx: 55, ny: 124 },
      '광주': { nx: 58, ny: 74 },
      '대전': { nx: 67, ny: 100 },
      '울산': { nx: 102, ny: 84 },
      '세종': { nx: 66, ny: 103 },
      // 필요 시 더 추가
    };
    return map[location] || null;
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('버튼클릭')
    const grid = getGridXY(location);
    if (!grid) {
      alert('지원되지 않는 지역입니다.');
      return;
    }

    const baseDate = () => {
        return new Date().toISOString().slice(0, 10).replace(/-/g, '');
    }

    const baseTime = () => {
        return new Date().toTimeString().slice(0, 5).replace(":", "")
    }

    try {
      const response = await axios.get(
        'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst',
        {
          params: {
            serviceKey: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
            pageNo: '1',
            numOfRows: '1000',
            dataType: 'JSON',
            base_date: baseDate(),
            base_time: baseTime(),
            nx: grid.nx,
            ny: grid.ny,
          },
        }
      );
      console.table(response)
      console.log(response)

      const items = response.data.response.body.items.item;

      // 원하는 카테고리만 필터링
      const filtered = items.filter((item: any) =>
        ['TMP', 'REH', 'POP', 'WSD'].includes(item.category)
      );

      setWeatherData(filtered);
    } catch (error) {
      console.error(error);
      alert('날씨 정보를 불러오는 데 실패했습니다.');
    }
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
            검색
            </Typography>
            <Box component='form' onSubmit={handleSearch} sx={{mt:1 , width:'100%'}}>  
                <TextField 
                    fullWidth
                    required
                    margin='normal'
                    label='지역검색'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    />
                <Button
                    type='submit'
                    fullWidth
                    variant='outlined'
                    color='success'
                    sx={{mt: 2}}
                    > 날씨검색 </Button>
            </Box>
        </Box>
    </Container>
  );
}
