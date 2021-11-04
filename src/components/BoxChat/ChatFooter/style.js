import { makeStyles} from '@mui/styles';

const useStyle = makeStyles(({theme})=>({
    container:{
        position:'fixed',
        right:0,
        left:401,
        bottom:56,
        height:46,
        background:'#fff',

        '&>div':{
            borderTop:'1px solid #bdbdbd',
            display:'flex',
            alignItems:'center',
            
            '&>div':{
                '&>svg:hover':{
                    cursor:'pointer',
                    borderRadius:'2px',
                    background:'#bdbdbd4d'
                }
            }
        }
    },
    
}))

export default useStyle