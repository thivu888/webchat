import { makeStyles } from "@mui/styles";

const useStyle = makeStyles(() => ({
    container: {
        display:'flex',
        flexDirection:'column',
        position:'relative',
        height:'84vh',
        overflowY:'scroll',
        overflowX:'hidden',
        padding:'0 40px 0 20px',
        '&::-webkit-scrollbar':{
            width: 8,
            opacity: 0.8,
            display: 'none',
            },
        '&:hover::-webkit-scrollbar':{
            width: 8,
            opacity: 1,
            display: 'block',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#fff',
        },
        '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#b9c0c7',
        height: '10%',
        borderRadius: '10px',
        }
    },
    avatar_Group_3:{
        position:'relative',
        '&>div':{
            position:'absolute',
            '&:nth-child(1)':{
                top:22,
                left:0,
            },
            '&:nth-child(2)':{
                top:22,
                left:50,
            },
            '&:nth-child(3)':{
                top:-14,
                left:20,

            }
        }
    },
    avatar_Group_4:{
        position:'relative',
        '&>div':{
            position:'absolute',
            '&:nth-child(1)':{
                top:22,
                left:0,
            },
            '&:nth-child(2)':{
                top:22,
                left:50,
            },
            '&:nth-child(3)':{
                top:-14,
                left:20,

            },
            '&:nth-child(4)':{
                top:22,
                left:20,
            },
        }
    }
}))

export default useStyle