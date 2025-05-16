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
      서울: { nx: 60, ny: 127 },
      부산: { nx: 98, ny: 76 },
      대구: { nx: 89, ny: 90 },
      인천: { nx: 55, ny: 124 },
      광주: { nx: 58, ny: 74 },
      대전: { nx: 67, ny: 100 },
      울산: { nx: 102, ny: 84 },
      세종: { nx: 66, ny: 103 },
      // 필요 시 더 추가
    };
    return map[location] || null;
  };

  const handleSearch = async () => {
    try {
      const now_date = new Date().toISOString().slice(0, 10).replace(/-/g, '');

      const now_time = (): string => {
        const time: string[] = ["0200", "0500", "0800", "1100", "1400", "1700", "2000", "2300"];
        const now: string = new Date().toTimeString().slice(0, 5).replace(":", "");
        const nowTime = parseInt(now, 10);

        const closestTime = time.reduce((prev, curr) => {
          const prevDiff = Math.abs(nowTime - parseInt(prev, 10));
          const currDiff = Math.abs(nowTime - parseInt(curr, 10));
          return prevDiff < currDiff ? prev : curr;
        });

        return closestTime;
      };

      const GridXY = getGridXY(location);

      if (!GridXY) {
        alert('해당 지역은 아직 정보를 불러올수 없습니다');
        return
      }

      const result = await axios.get(
        'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst',
        {
          params: {
            serviceKey: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
            numOfRows: 10,
            pageNo: 1,
            dataType: 'JSON',
            base_date: now_date,
            base_time: now_time(), // "0200", "0500", "0800", "1100", "1400", "1700", "2000", "2300" 고정된 시간을 안하고 임의로하면 undefind라고 하면서 에러 발생
            nx: GridXY.nx,
            ny: GridXY.ny,
          },
        },
      );

      let data = result.data.response.body.items.item.filter((value: any) => ["TMP","WSD","POP","WAV"].includes(value.category))
      let last = data.map((value: any )=> ({
        category: value.category,
        fcstValue: value.fcstValue
      }) )

      console.log(last)
      setWeatherData(last)

    } catch (error) {
      console.error(error);
      alert('날씨 정보를 불러오는 데 실패했습니다.');
    }
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
          검색
        </Typography>
        <Box sx={{ mt: 1, width: '100%' }}>
          <TextField
            fullWidth
            required
            margin="normal"
            label="지역검색"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Button
            fullWidth
            variant="outlined"
            color="success"
            sx={{ mt: 2 }}
            onClick={handleSearch}
          >
            {' '}
            날씨검색{' '}
          </Button>
        </Box>
        <Box>
        {weatherData.length > 0 && (
          weatherData.map((value,index) => (
            <Box key={index}>
              {value.category === "TMP" && (
                <Typography variant='h6'>🌡️온도: {value.fcstValue}</Typography>
              )}
              {value.category === "WSD" && (
                <Typography variant='h6'>🌬️풍량: {value.fcstValue}</Typography>
              )}
              {value.category === "POP" && (
                <Typography variant='h6'>🌧️강수량: {value.fcstValue}</Typography>
              )}
              {value.category === "WAV" && (
                <Typography variant='h6'>🌊파고: {value.fcstValue}</Typography>
              )}
            </Box>
          ))
        )}
        </Box>
      </Box>
    </Container>
  );
}
