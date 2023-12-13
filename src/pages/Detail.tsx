import { connect } from "react-redux";
import { IState } from "./../store";

function Detail() {
  return <div>Detail</div>;
}

function mapStateToProps(state: IState[], ownProps) {
  const {
    match: {
      params: { id },
    },
  } = ownProps;
  return { toDo: state.find((toDo) => toDo.id === parseInt(id)) };
}

export default connect(mapStateToProps)(Detail);
