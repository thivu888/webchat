import { makeStyles } from "@mui/styles"

const useStyle = makeStyles(() => ({
    container:{
        position:'relative',
        left:64,
        '&::-webkit-scrollbar':{
            width: 5,
        },
    }
}))

export default useStyle