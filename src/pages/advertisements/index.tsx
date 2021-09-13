import {
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import CarCard from "../../components/CarCard";
import CustomDivider from "../../components/CustomDivider";
import Loader from "../../components/Loader";
import Toast from "../../components/Toast";
import SecondaryLayout from "../../layout/SecondaryLayout";
import PageHeader from "../../sections/PageHeader";
import { Colors } from "../../theme/themeConstants";
import { ADVERTISEMENTS } from "../../utils/constants/language/en/text";
import useAdvertisements from "./useAdvertisements";

const AdverstisementStyles = makeStyles(() => ({
  inputStyles: {
    padding: 5,
  },
}));

const Advertisements = () => {
  const classes = AdverstisementStyles();
  const {
    // data,
    result,
    // page,
    // setPage,
    isLoading,
    toastMessage,
    toastOpen,
    toastType,
    setToastOpen,
    pageCount,
    getCars,
    // keywords,
    setKeywords
  } = useAdvertisements();
  return (
    <SecondaryLayout>
      <Grid container style={{minHeight:"90vh"}}>
        <PageHeader heading={ADVERTISEMENTS}>
        <TextField
            placeholder="Search"
            // value={keywords}
            onKeyDown={(e)=>{if(e.key === "Enter"){
              return getCars(1)
            }
            }}
            onChange={(e)=>setKeywords(e.target.value)}
            style={{ backgroundColor: Colors.background }}
            InputProps={{
              classes: {
                input: classes.inputStyles,
              },
              startAdornment: (
                <InputAdornment
                  position="start"
                  className={classes.inputStyles}
                >
                  <IconButton className={classes.inputStyles} onClick={()=>getCars(1)}>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </PageHeader>
        <CustomDivider/>
        {result.map((item: any, index: number) => (
          <Grid
            item
            xs={12}
            style={{ display: "flex" }}
            justifyContent="center"
            key={"car-card-ad-" + index}
          >
            <CarCard data={item} layoutType="list" />
          </Grid>
        ))}
        <Grid
          item
          xs={12}
          style={{ display: "flex" , marginTop:5}}
          justifyContent="flex-end"
        >
          <Pagination count={pageCount} onChange={(event, value)=>getCars(value)} color="secondary"/>
        </Grid>
      </Grid>
      <Loader open={isLoading} isBackdrop={true} />
      <Toast
        onClose={() => setToastOpen(false)}
        open={toastOpen}
        message={toastMessage}
        type={toastType}
      />
    </SecondaryLayout>
  );
};

export default Advertisements;
