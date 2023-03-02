const colorSchema = colorSchemaFactory()

function colorSchemaFactory() {
  const DWThemeLight = {
    dark: false,
    
    background: {
      primary: "rgb(255, 255, 255)",
      secondary: "#f1f3f5",
      darkest:"rgb(50, 60, 69)"
    },

    triade: {
      primary: "rgb(0, 165, 255)",
      secondary: "#f8b133",
      thirdary: "rgb(0, 45, 90)",

    },

    fonts: {
      h2:"rgb(0, 45, 90)",
      h3: "rgb(50, 60, 69)",
      normal: "rgb(0, 45, 90)",
      h4_light:"#c6c6c6", 
      white:"#ffff"
    },



   icons:{
    primary:"rgb(0, 45, 90)",
    secondary:"",
    super_light:"#ffff" , 
    off:"#c6c6c6"

   },

    main: "rgb(255, 255, 255)",
    secondaryBackGround: "#72109C",
    fontH2: "rgb(0, 45, 90)",
    fontH3: "rgb(0, 45, 90)",
    font: "rgb(0, 45, 90)",
    colorFullPallet: {
      mainColor: "rgb(0, 165, 255)", //"#A200E8",
      mainColorDark: "rgb(0, 165, 255)",
      mainSuperDark: "#59087c",
      a1_Light: ":#17E888",
      a1_Dark: "#089C57",
      b1: "#E8A417",
      c1_dark: "#300CF5",
      c1_light: "#0CD3E8",
    },
  };


  const DWThemeDark = {
    dark: true,
    
    background: {
      primary:'#000',// "rgb(255, 255, 255)",
      secondary: "#f1f3f5",
      darkest:"rgb(50, 60, 69)"
    },

    triade: {
      primary: "rgb(0, 165, 255)",
      secondary: "#f8b133",
      thirdary: "rgb(0, 45, 90)",

    },

    fonts: {
      h2:"#fff", //"rgb(0, 45, 90)",
      h3: "#c6c6c6",
      normal: "#c6c6c6",
      h4_light:"#c6c6c6", 
      white:"#ffff"
    },



   icons:{
    primary:"rgb(0, 45, 90)",
    secondary:"",
    super_light:"#ffff" , 
    off:"#c6c6c6"

   },

    main: "rgb(255, 255, 255)",
    secondaryBackGround: "#72109C",
    fontH2: "rgb(0, 45, 90)",
    fontH3: "rgb(0, 45, 90)",
    font: "rgb(0, 45, 90)",
    colorFullPallet: {
      mainColor: "rgb(0, 165, 255)", //"#A200E8",
      mainColorDark: "rgb(0, 165, 255)",
      mainSuperDark: "#59087c",
      a1_Light: ":#17E888",
      a1_Dark: "#089C57",
      b1: "#E8A417",
      c1_dark: "#300CF5",
      c1_light: "#0CD3E8",
    },
  };







  return DWThemeDark;
}

export default colorSchema;
/*
pallet  triad
purple main:#A200E8
purple darker:#72109C
green  light :#17E888
green dark :#089C57
golden :#E8A417
 blue #300CF5
 light Blue #0CD3E8


 azul claro rgb(0, 165, 255);
rgb(0, 45, 90);

orange
#f8b133 

rgb(255, 255, 255)  = branco


 grey fundo =#f1f3f5

  preto rgb(50, 60, 69)

*/
