import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  Divider,
  InputBase,
  TableBody,
  TablePagination,
  IconButton,
} from "@material-ui/core";
import {
  alpha,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import {
  ADS_VIEWS_LOGS_LIST,
  ACTION,
  FULL_NAME,
  PHONE,
  NOT_AVAILABLE,
  USER_NOT_AVAILABLE,
  AD_NOT_AVAILABLE,
  CLICKED_BY,
  CLICKED_DATE,
  AD_CLICKED,
  BUYER_PHONE,
  CANT_FIND_RESULT,
} from "../../utils/constants/language/en/buttonLabels";
import SearchIcon from "@material-ui/icons/Search";
import { IViewsLogsTableRow } from "../../pages/adsViewsLogs";
import { Skeleton } from "@material-ui/lab";
import { DeleteRounded, EditRounded } from "@material-ui/icons";
import { useHistory } from "react-router";
import { paths } from "../../routes/paths";
import { Colors } from "../../theme/themeConstants";

const TableStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: theme.palette.primary.main,
      "& > h3": {
        color: theme.palette.common.white,
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: theme.palette.common.white,
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
      color: theme.palette.common.white,
    },
    links: {
      cursor: "pointer",
      color: theme.palette.primary.main,
      "&:hover": {
        textDecoration: "underline",
      },
    },
  })
);

interface IViewsLogsTableRowProps {
  data: IViewsLogsTableRow;
}

export const Row: React.FC<IViewsLogsTableRowProps> = ({ data }) => {
  const { links } = TableStyles();
  const history = useHistory();
  const { buyer_details, car_details, clickedDate, _id } = data;
  return (
    <TableRow>
      {buyer_details !== null ? (
        <TableCell
          classes={{ body: links }}
          onClick={() =>
            history.push(paths.userDetail + "/" + buyer_details._id)
          }
        >
          {buyer_details.firstName + " " + buyer_details.lastName}
        </TableCell>
      ) : (
        <TableCell>{USER_NOT_AVAILABLE}</TableCell>
      )}

      <TableCell>
        {buyer_details !== null && buyer_details.phone
          ? buyer_details.phone
          : NOT_AVAILABLE}
      </TableCell>
      {car_details !== null ? (
        <TableCell
          classes={{ body: links }}
          onClick={() => history.push(paths.carDetail + "/" + car_details._id)}
        >
          {car_details.make +
            " " +
            car_details.model +
            " (" +
            car_details.modelYear +
            ")"}
        </TableCell>
      ) : (
        <TableCell>{AD_NOT_AVAILABLE}</TableCell>
      )}
      <TableCell>{new Date(clickedDate).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
      {/* <TableCell align="center">
        <IconButton onClick={() => handleUpdate(_id)}>
          <EditRounded color="primary" />
        </IconButton>
        <IconButton onClick={() => handleDelete(_id)}>
          <DeleteRounded style={{ color: "#C20000" }} />
        </IconButton>
      </TableCell> */}
    </TableRow>
  );
};

interface IViewsLogsTableProps {
  data?: IViewsLogsTableRow[];
  loading: boolean;
  totalCount: number;
  page: number;
  rowsPerPage: number;
  keywords: string;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchInputChange: (e: any) => void;
}

const ViewsLogsTable: React.FC<IViewsLogsTableProps> = ({
  data,
  loading,
  totalCount,
  page,
  rowsPerPage,
  keywords,
  handleChangePage,
  handleChangeRowsPerPage,
  handleSearchInputChange,
}) => {
  const { toolbar, search, searchIcon, inputRoot, inputInput } = TableStyles();

  return (
    <TableContainer component={Paper}>
      <Toolbar className={toolbar}>
        <Typography variant="h3">{ADS_VIEWS_LOGS_LIST}</Typography>
        <div className={search}>
          <div className={searchIcon}>
            <SearchIcon color="inherit" />
          </div>
          <InputBase
            placeholder="Search…"
            onKeyPress={handleSearchInputChange}
            classes={{
              root: inputRoot,
              input: inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </Toolbar>
      <Divider />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{CLICKED_BY}</TableCell>
            <TableCell>{BUYER_PHONE}</TableCell>
            <TableCell>{AD_CLICKED}</TableCell>
            <TableCell>{CLICKED_DATE}</TableCell>
            {/* <TableCell align="center">{ACTION}</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <>
              {[...Array(rowsPerPage)].map((item, index) => (
                <TableRow key={index}>
                  {[...Array(5)].map((item, index) => (
                    <TableCell key={index}>
                      <Skeleton variant="rect" width="100%" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </>
          ) : (
            data && data.map((user: IViewsLogsTableRow) => <Row data={user} />)
          )}
        </TableBody>
      </Table>
      {data && !(data.length > 0) && (
        <Typography
          style={{ width: "100%", margin: "20px 0" }}
          align="center"
          variant="h2"
        >
          {CANT_FIND_RESULT}
        </Typography>
      )}
      {data && (
        <>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </TableContainer>
  );
};

export default ViewsLogsTable;
