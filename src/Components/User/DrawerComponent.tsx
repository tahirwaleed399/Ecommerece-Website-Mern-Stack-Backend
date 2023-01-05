
import { Drawer ,  Button, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay,  RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, Radio, RadioGroup } from '@chakra-ui/react'
import React from 'react'
import categories from '../../utils/categories';
const DrawerComponent = ({isOpen , onClose , btnRef , setPrice,setCategory} : any) => {
let [rangeValue , setRangeValue ] = React.useState<number[]>([0,20000]);
let [categoryFilter , setCategoryFilter] = React.useState<string>(' ');
  function handleSlide(e:any){
   setRangeValue(e)

  }
  function handleFilter(){
    setPrice(rangeValue);
    setCategory(categoryFilter);
    console.log(rangeValue,categoryFilter);
    
    
  }
  return (
    <><Drawer
    isOpen={isOpen}
    placement='right'
    onClose={onClose}
    finalFocusRef={btnRef}
  >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>Filter Products</DrawerHeader>

      <DrawerBody>
  <h1 className='text-xl my-1 font-medium'>Price</h1>

      <RangeSlider 
      step={50}
      min={0}
      max={20000}
      onChange={handleSlide}
  aria-label={['min', 'max']}
  colorScheme='pink'
  defaultValue={[rangeValue[0], rangeValue[1]]}
>
  <RangeSliderTrack>
    <RangeSliderFilledTrack />
  </RangeSliderTrack>
  <RangeSliderThumb index={0} />
  <RangeSliderThumb index={1} />
</RangeSlider>
<span>{`Rs: ${rangeValue[0]} - Rs: ${rangeValue[1]}`}</span>


<RadioGroup onChange={(e)=>{setCategoryFilter(e)}} defaultValue={'all'}>
  <h1 className='text-xl my-1 font-medium'>Categories</h1>
<Radio value={'all'} colorScheme='pink' >
   All
</Radio>
  {categories.map((category)=> {
    return (

<>
<br />
<Radio value={category} colorScheme='pink'>
    {category}
</Radio>
 </>
    )
  })}
</RadioGroup>
      </DrawerBody>

      <DrawerFooter>
        <Button variant='outline' mr={3} onClick={onClose}>
          Cancel
        </Button>
        <Button colorScheme='pink' onClick={handleFilter}>Filter</Button>
      </DrawerFooter>
    </DrawerContent>
  </Drawer></>
  )
}

export default DrawerComponent