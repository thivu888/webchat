import { makeStyles} from '@mui/styles';

const useStyle = makeStyles(({theme})=>({
    container:{
        height:68,
        padding:'0 16px',
        background:'#fff',
        display:'flex',
        alignItems:'center',
        width:'100%',
        position:'relative',
        borderBottom:'1px solid #dbdbdb',
    },
    IconWraper:{
        display:'flex',
        alignItems:'center',
        justifyContent:'space-around',
        width:150,
        position:'absolute',
        right:'10px',
        '&>div':{
            width:28,
            height:28,
            '&>svg:hover':{
                cursor:'pointer',
                borderRadius:'2px',
                background:'#bdbdbd4d'
            }
        }
    },
    avatarWraper:{
        padding:'10px 0',
        '&>div':{
            width:48,
            height:48
        }
    }
    ,
    name:{
        color:'001a33',
        fontSize:18,
        fontWeight:600,
    },
    timeAgo:{
        fontSize:14,
        color:'#72808e'
    },
    info:{
        display:'flex',
        flexDirection:'column'
    }
    
}))

export default useStyle