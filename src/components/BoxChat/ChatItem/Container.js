import { Box, styled } from '@mui/system'
import { Avatar } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Text from './Text/Container'
import VideoItem from './Video'
import ImageItem from './Image'
import { MessageTypes, FileTypes } from '../../../constant/types'
import useStyleListConversation from '../../ListConversation/style'
import { DownLoad } from '../../../utils/download';
const Container = styled('div')((props) => {
        const {isOwn} = props
        return({
            padding: '16px 0 16px 16px',
            alignSelf: `${isOwn ? 'flex-end' : 'flex-start'}`,
            '& > div': {
                display:'flex',
                alignItems:'flex-start',
                alignItems:'center',
                '& > svg': {
                    marginRight:`${isOwn ? '12px' : '0px'}`,
                    marginLeft:`${!isOwn ? '12px' : '0px'}`,
                },
                '&:hover':{
                    '& > svg':{
                        opacity:'1',
                        visibility:'visible'
                    }
                },
            },
            
        })
    }   
)

const Index=(props)=>{

    const classConversation = useStyleListConversation()
    const {me,you,isOwn,content,isRead,type,id} = props

    const getItem = ({isOwn,type,content,message}) => {
        if(MessageTypes.MESSAGE === type ){
            return <Text isOwn={isOwn} content={content}/>
        } else if( MessageTypes.VIDEO === type) {
            return <VideoItem isOwn={isOwn} content={content}/>
        } else if(MessageTypes.IMAGE === type) {
            return <ImageItem isOwn={isOwn} content={content}/>
        }
    }

    const handleDownloadFile = (url) => {
        DownLoad(url)
    }


    return(<>
            <Container isOwn={isOwn} id={id}>
                <Box>
                    {!props.isOwn &&
                        <Box>
                            <Avatar src={you.avatar}/>
                        </Box>
                    }
                    {type === MessageTypes.FILE && isOwn ?  <FileDownloadIcon className={classConversation.icon_more} onClick={()=>handleDownloadFile(content)}/> : null}
                    { getItem(props) }
                    {type === MessageTypes.FILE && !isOwn ? <FileDownloadIcon className={classConversation.icon_more} onClick={()=>handleDownloadFile(content)}/> : null}
                </Box>
            </Container>
        </>
    )
}

export default Index