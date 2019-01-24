import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { angleDoubleLeft, angleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import './MonthCheckRow.css';
import moment from 'moment';

class MonthCheckRow extends Component {
    onSubMonth(e) {
        let date = moment(this.props.date).subtract(1, 'months').format('YYYY-MM-DD');
        this.props.onChangeMonth(date);
        e.preventDefault();
    }

    onAddMonth(e) {
        let date = moment(this.props.date).add(1, 'months').format('YYYY-MM-DD');
        this.props.onChangeMonth(date);
        e.preventDefault();
    }


    render() {
        let date = moment(this.props.date);
        let preMonthDate = moment(this.props.date).subtract(1, 'months');
        let postMonthDate = moment(this.props.date).add(1, 'months');

        return (
            <div className="row">
                <div className="col-sm MonthCheckRow-left" onClick={this.onSubMonth.bind(this)}>
                    <h5>
                        <span><FontAwesomeIcon icon="angle-left" /></span>
                        {` ${preMonthDate.month() + 1}월`}
                    </h5>
                </div>
                <div className="col-sm MonthCheckRow-center">
                    <h5>{`${date.year()}년 ${date.month() + 1}월`}</h5>
                </div>
                <div className="col-sm MonthCheckRow-right" onClick={this.onAddMonth.bind(this)}>
                    <h5>
                        {`${postMonthDate.month() + 1}월 `}
                        <span><FontAwesomeIcon icon="angle-right" /></span>
                    </h5>
                </div>
            </div>
        );
    }
}

export default MonthCheckRow;