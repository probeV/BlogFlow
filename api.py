import requests
import json
import pandas as pd
import config  

# API 요청 변수 
PERIOD= "D"
START_DAY= "20250106"
END_DAY= "20250106"

Exchange = { # 환율 관련 
    "Weekily": {
        # 3.1.1.1. 주요국  통화의 대원화환율
        "STAT_CODE": "731Y001" 
        [
            { # 원/미국달러(매매기준율)
                "ITEM_CODE": "0000001"
            },
            { # 원/위안(매매기준율)
                "ITEM_CODE": "0000053"
            },
            { # 원/일본엔(100엔,매매기준율)
                "율ITEM_CODE": "0000002"
            },
            { # 원/유로
                "ITEM_CODE": "0000003"
            }, 
        ],
        # 3.1.1.3 원화 대미달러, 원화의 대위안/대엔 환율 
        "STAT_CODE": "731Y003"
        [
            { # 원/달러(시가)
                "ITEM_CODE": "0000002"
            },  
            { # 원/달러(고가)
                "ITEM_CODE": "0000005"
            },  
            { # 원/달러(저가)
                "ITEM_CODE": "0000004"
            },  
            { # 원/달러(종가 15:30)
                "ITEM_CODE": "0000003"
            },  
            { # 원/달러(종가 02:00)
                "ITEM_CODE": "0000013"
            },  
        ],
        # 1.3.1. 한국은행 기준금리 및 여수신금리
        "STAT_CODE": "772Y001"
        [
            { # 한국은행 기준금리
                "ITEM_CODE": "0101000"
            }
        ],
        # 1.3.2.1. 시장금리(일별)
        "STAT_CODE": "817Y002"
        [
            { # 콜금리(1일, 전체거래)
                "ITEM_CODE": "010101000"
            },
            { # 콜금리(1일, 중개회사거래)
                "ITEM_CODE": "010102000"
            },
            { # 콜금리(1일, 은행증권금융차입)
                "ITEM_CODE": "010103000"
            },
            { # 국고채(3년) (연%)
                "ITEM_CODE": "010200000"
            },
            { # 국고채(10년) (연%)
                "ITEM_CODE": "010210000"
            },
            { # 회사채(3년, AA-) (연%)
                "ITEM_CODE": "010300000"
            }
        ],
        # 6.4. 뉴스심리지수(실험적통계)
        "STAT_CODE": "521Y001"
        [
            {# 뉴스심리지수
                "ITEM_CODE": "A001"
            }
        ]
    }
}

# API 요청 URL 생성
base_url = "https://ecos.bok.or.kr/api/StatisticSearch"
params = f"{config.API_KEY}/json/kr/1/100000/{STAT_CODE}/{PERIOD}/{START_DAY}/{END_DAY}/{ITEM_CODE}/?/?/?"

# API 호출
url = f"{base_url}/{params}"
print(url)
response = requests.get(url)

# 응답 확인
if response.status_code == 200:
    data = response.json()
    
    # 데이터 추출 및 변환
    raw_data = data["StatisticSearch"]["row"]
    df = pd.DataFrame(raw_data)
    
    print(df)
    
    # # 주요 컬럼 선택
    # df = df[["TIME", "DATA_VALUE"]]
    # df.columns = ["날짜", "환율"]
    
    # # 데이터 형식 변환
    # df["날짜"] = pd.to_datetime(df["날짜"], format="%Y%m")
    # df["환율"] = df["환율"].astype(float)
    
    # # 데이터 출력
    # print(df.head())
else:
    print("API 요청 실패:", response.status_code)
