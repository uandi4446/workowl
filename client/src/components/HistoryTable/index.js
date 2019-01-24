import React, { Component } from 'react';
import './HistoryTable.css';

class HistoryTable extends Component {
    render() {
        let schedules = this.props.schedules? this.props.schedules:[];

        return (
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">날짜</th>
                        <th scope="col">예정출근시간</th>
                        <th scope="col">출근시간</th>
                        <th scope="col">예정퇴근시간</th>
                        <th scope="col">퇴근시간</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        );
    }
}

export default HistoryTable;