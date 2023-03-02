import colorSchema from "../../../colorSchemma/color";

export const stylesHome = {
  container: {
    flex: 1,
    backgroundColor: colorSchema.background.primary,
    alignItems: "center",
    // justifyContent: "center",
  },

  backgroundImage: {
    height: "100%",
    width: "100%",
    opacity: 0.05,
    position: "absolute",
  },

  listHeaderWrapper: {
    width: "99%",
    paddingTop: 10,
    marginTop: 5,

    // backgroundColor:"black"
  },

  bandPlayerBox: {
    // position: "absolute",
    marginVertical: 10,
    marginTop: 0,
    marginBottom: 20,

    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  swipperContainer: {
    paddingTop: 20,
  },

  trackCardBox: {
    paddingHorizontal: 10,
    width: "99%",
    alignSelf: "center",
  },

  boxMessage: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: "90%",
  },
  boxFont: {
    color: "#8d8989",
  },
  writerContainer: {
    //height: 55,
    marginLeft: 20,
    marginTop: 0,
    flexDirection: "row",
  },
  descriptionBox: {
    paddingHorizontal: 10,
    width: "100%",
    marginBottom: 20,
  },
  descriptionBoxfont: {
    fontFamily: "custom",
    color: colorSchema.fonts.h3,
  },
};
