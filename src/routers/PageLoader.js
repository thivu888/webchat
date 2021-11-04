import React ,{Component} from 'react';
import { styled, alpha,keyframes } from '@mui/material/styles';

const spinner = keyframes`
    0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); }
`;


const PaceRoot = styled('div')(({theme})=>({
    PointerEvent:'none',
    userSelect:'none',
}))

const PaceProgress= styled('div')(({theme})=>({
    backgroundColor:theme.palette.primary.dark,
    position:'fixed',
    zIndex:10000,
    top:0,
    left:0,
    height:2,
    transition:'width 300ms',
    boxShadow:`0 0 10px ${theme.palette.primary.light}, 0 0 5px ${theme.palette.primary.light}`

}))
    
const PaceProgressInner = styled('div')(({theme})=>({
    display: 'block',
    position: 'absolute',
    right: 0,
    width: 100,
    height: '100%',
    boxShadow: `0 0 10px ${theme.palette.primary.light}, 0 0 5px ${theme.palette.primary.light}`,
    opacity: 1,
    transform: 'rotate(3deg) translate(0px, -4px)',
}))

const PaceActivity =styled('div')(({theme})=>({
    display: 'block',
    position: 'fixed',
    zIndex:10000,
    top: 15,
    right: 15,
    width: 14,
    height: 14,
    border: 'solid 2px transparent',
    borderTopColor: theme.palette.primary.light,
    borderLeftColor: theme.palette.primary.light,
    borderRadius: '10px',
    animation: `${spinner} 300ms infinite linear` 
}))

class PageLoader extends Component {
    isUnmounted = false;
    
    constructor(props) {
        super(props);
        this.state = { width: 0 }
    }

    componentWillUnmount = () => {
        this.isUnmounted = true;
        clearInterval(window.intervalPageLoader);
    };

    

    componentDidMount() {
        window.intervalPageLoader = setInterval(() => {
            if (!this.isUnmounted) {
                let { width } = this.state;
                if (width < 95) {
                    width += 1;
                    this.setState({ width })
                } else {
                    clearInterval(window.intervalPageLoader)
                }
            }
        }, 100)
    }

    render() {
        return (
            <PaceRoot>
                <PaceProgress sx={{ width: `${this.state.width}%`}}>
                    <PaceProgressInner />
                </PaceProgress>
                <PaceActivity />
            </PaceRoot>
        );
    }
}
export default PageLoader;