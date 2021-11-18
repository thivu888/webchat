import { makeStyles} from '@mui/styles';


const useStyle = makeStyles(() => ({
    container: {
        display:'flex',
        flexDirection:'column',
        position:'relative',
        height:'84vh',
        overflowY:'scroll',
        overflowX:'hidden',
        padding:'0 10px'
    },
    iconLoading: {
        margin:'0 auto',
        width:'20px !important',
        height:'20px !important'
    }
}))

export default useStyle