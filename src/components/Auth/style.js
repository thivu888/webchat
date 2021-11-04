import { makeStyles,withStyles} from '@mui/styles';
 
 const useStyle=makeStyles(()=>({
     title:{
        width :320,
        margin:'30px auto',
        textAlign:'center'
     },
    wraper: (props)=>({
        width:360,
        height:400,
        marginLeft:'auto',
        marginRight:'auto',
        background:'#fff',
        marginTop:20,
        borderRadius:4,
    }),
    header:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottom:"1px solid #bdbdbd",
        '& > div':{
            padding:'10px 0',
            flexGrow:"1",
            cursor:'pointer',
            '&>p':{
                display:'block',
                padding:'8px 0',
                textAlign:'center'
            }
        },
        '& > p':{
            height:20,
            border:"1px solid #bdbdbd",
        }
    },
    active:{
        borderBottom:"1px solid #504f4f",
        '&>p':{
            fontWeight:700
        }
    },
    content_qr:{
        '& p':{
            color:'#000',
            textAlign:'center',
            fontSize:'small'
        }
    },
    qr_img:{
        width:230,
        height:230,
        margin:'35px auto',
        '&> img':{
            width:'100%',
            border:'1px solid rgba(0,0,0,0.2)'
        }
    },
    content:{
        '&>div':{
            display:'flex',
            alignItems:'center',
            padding:'16px',
            
            '& button':{
                '&:hover':{
                    outline:'none',
                    border:'none',
                }
            }
        }
    },
    transition_popper:{
        zIndex:100,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:48,
        borderRadius:'6px',
        '&>div':{
            width:'100%',
            padding:'8px',
            borderRadius:'4px',
            background:'#1976d2',
            '&>div':{
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                "&>svg":{
                    fill:'#fff',
                    cursor:'pointer'
                }
            }
        }
    }
}))

export default useStyle