import React from "react";
import {connect} from "react-redux";
import {increment, setDefaultValue} from "../Stores/slices/CommonSlice";

class TestComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div onClick={() => {this.props.setDefaultValue(33); console.log("increment")}}>{`Число кликов: ${this.props.value}`}</div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => dispatch(increment()),
        setDefaultValue: (value) => dispatch(setDefaultValue(value)),
    }
};

function mapStateToProps(state, ownProps) {
    const { common } = state

    return { value: common.value }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);

