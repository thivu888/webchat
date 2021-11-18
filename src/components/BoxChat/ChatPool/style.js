import { makeStyles} from '@mui/styles';


const useStyle = makeStyles(() => ({
    container: {
        display:'flex',
        flexDirection:'column',
        position:'relative',
        height:'84vh',
        overflow:'scroll'
    },
    iconLoading: {
        margin:'0 auto',
        width:'20px !important',
        height:'20px !important'
    }
}))

export default useStyle