import { makeStyles} from '@mui/styles';


const useStyle = makeStyles(() => ({
    container: {
       width:150,
       height:180,
       position:'relative',
       background:'#0084ff',
       borderRadius:'8px',
       overflow:'hidden',
       boxShadow: '0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)',
    },
}))

export default useStyle