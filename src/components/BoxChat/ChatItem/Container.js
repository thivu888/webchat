import { Box, styled } from '@mui/system'
import { Avatar } from '@mui/material'
import Text from './Text/Container'
const Container = styled('div')((props) => {
        const {isOwn} = props
        return({
            padding: '16px 0 16px 16px',
            alignSelf: `${isOwn ? 'flex-end' : 'flex-start'}`,
            '&>div': {
                display:'flex',
                alignItems:'flex-start'
            }
        })
    }   
)

const Index=(props)=>{

    const {me,you,isOwn,content,isRead,value} = props
    return(<>
            <Container isOwn>
                <Box>
                    {!props.isOwn &&
                        <Box>
                            <Avatar src={you.avatar}/>
                        </Box>
                    }
                    <Text isOwn={isOwn} content={content}/>
                </Box>
            </Container>
        </>
    )
}

export default Index