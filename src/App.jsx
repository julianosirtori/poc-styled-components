import './App.css'
import { styled } from './lib/styled'

const Button = styled.button`
  border: none;
  background: red;
  padding:  27px;
  margin-right: 12px;
`

const Box = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid green;
`


function App() {
  
  return (
    <div>
      <h1>POC Styled Components</h1>
      <Button>
        Teste
      </Button>
      <Button>
        <Box/>
      </Button>
      <Box/>
    </div>
   
  )
}

export default App
