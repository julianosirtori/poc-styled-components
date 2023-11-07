import './App.css'
import { styled } from './lib/styled'

const Button = styled.button`
  border: none;
  background: #e82a2a;
  padding:  27px;
  margin-right: 12px;
`

const Box = styled.div`
  width: 100px;
  height: 100px;
  background: ${({color}) => color};
`


function App() {
  
  return (
    <div>
      <h1>POC Styled Components</h1>
      <Button>
        Teste
      </Button>
      <Button>
        <Box color="red" />
      </Button>
      <Box color="green"/>
    </div>
   
  )
}

export default App
