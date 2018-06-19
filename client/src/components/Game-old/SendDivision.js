import React from 'react';
import PlanetThumb from './PlanetThumb';
import { calcDistance } from '../../helpers';

class SendDivision extends React.Component {
    state = {
        ships: 0
    };

    handleUp = e => {
        e.preventDefault();
        this.setState(prev => ({ ships: prev.ships + 1 }), () => {
            this.props.setShips(this.state.ships);
        });
    }

    handleDown = e => {
        e.preventDefault();
        this.setState(prev => ({ ships: prev.ships - 1 }), () => {
            this.props.setShips(this.state.ships);
        });
    }

    render() {
        if (this.props.selected) {
            this.selected = this.props.selected;
        }
        else {
            this.selected = { from: null, to: null, ships: this.state.ships };
        }

        if (this.props.selected.from && this.props.selected.to)
            this.distance = calcDistance(this.props.distanceMatrix, this.props.selected.from.name, this.props.selected.to.name);
        else
            this.distance = 0;


        return (
            <div className='division'>
                <div className='division-left'>
                    <PlanetThumb planet={this.selected.from} />
                </div>

                <div className='division-mid'>
                    <div className='top'>
                        <span className='dec'><i className='fas fa-arrow-down' onClick={this.handleDown}></i></span>
                        <span className='number-of-ships'>{this.selected.ships}</span>
                        <span className='inc'><i className='fas fa-arrow-up' onClick={this.handleUp}></i></span>
                        <span className='icon'>
                            <i className='fas fa-rocket'></i>
                        </span>
                    </div>
                    <div className='bottom'>
                        <span className='timeleft'>
                            {this.distance}
                        </span>
                        <span className='icon'>
                            <i className='fas fa-clock'></i>
                        </span>
                    </div>
                </div>

                <div className='division-right'>
                    <PlanetThumb planet={this.selected.to} />
                </div>
            </div >
        );
    }
};

export default SendDivision;