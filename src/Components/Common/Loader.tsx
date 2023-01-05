import { Spinner } from '@chakra-ui/react'


const Loader = () => {
  return (
    <div style={{
      height:'100%',
      width : '100%',
      display:'grid',
    placeItems:'center'
    }}>



<Spinner
  thickness='4px'
  speed='0.35s'
  emptyColor='gray.200'
  color='brandPink.500'
  size='xl'
  margin={'50px'}
/>
    </div>
  )
}
export default Loader