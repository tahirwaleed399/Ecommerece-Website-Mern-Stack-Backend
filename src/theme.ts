
// 1. import `extendTheme` function
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools';
// 2. Add your color mode config
const styles = {
  global: (props:any) => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('gray.100', '#141214')(props),
    },
  }),
};

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,

}
const colors = {
  pinkColor : {
    lightMode : 'brandPink.400',
    darkMode : 'brandPink.100'
  }
  ,
    brandPink: {
      100: "#a61c3c",
      200: "#951936",
      300: "#851630",
      400: "#74142a",
      500: "#641124",
      600: "#530e1e",
      700: "#420b18",
      800: "#a61c3c",
      900: "#A61C3C",
    }, 
       brandYellow: {
      100: "#f4ac45",
      200: "#dc9b3e",
      300: "#c38a37",
      400: "#ab7830",
      500: "#926729",
      600: "#7a5623",
      700: "#62451c",
      800: "#31220e",
      900: "#181107",
    },

}

const Button = {
  variants: {
    'pinko': {
      bg: 'brandPink.400',
      boxShadow: '0 0 2px 2px #efdfde',
      color:'white'
    },
  }
}
// const Input = {
//   variants:{
//     outline: {
// field:{
//   borderColor:'pink.900',
//   _focus:{
//     transition : '300ms',
//     borderColor :'pink.200',
//     borderWidth:'2px',
//     boxShadow:'none'
//   }
// }
//     }
//   }
// }
const NumberInput = {
variants:{
  filled :{
    field:{
      color:'white',
      backgroundColor:'brandPink.100',
      _focus:{
      color:'black',

        transition : '300ms',
        borderColor :'brandPink.400',
        borderWidth:'2px',
        boxShadow:'none'
      }
     }
  }
}

}
// 3. extend the theme
const theme = extendTheme({ config, styles , colors, components:{
  Button,
  // Input,
  NumberInput
}})

export default theme;

// #A61C3C dark pink
// #F4AC45 tellow 