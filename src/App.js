import React, {Component} from 'react';
import './App.css';

const Papa = require('papaparse')

class App extends Component {
    constructor() {
        super();
        this.fileReader = new FileReader();
        this.state = {
            rawData: [],
            jsonData: [],
            formattedid: '',
            scheduleState: '',
            owner: ''
        }
        this.onAddInProgress=0
        this.onAddDefined=0
        this.onAddAccepted=0
        this.onAddComleted=0
    }

    headerData() {
        return (
            <thead>
            <tr>
                <th>Formatted ID</th>
                <th>Name</th>
                <th>Schedule State</th>
                <th>Plan Estimate</th>
                <th>Task Estimate Total</th>
                <th>Task Actual Total</th>
                <th>Task Remaining Total</th>
                <th>Owner</th>
                <th>Tag</th>
                <th>Ready</th>
            </tr>
            </thead>);
    }

    rowData(data, index) {

    }

    renderData() {

        return this.state.jsonData.map((data, index) => {
            return (<tbody><tr key={index}>
                    <td>{data['Formatted ID']}</td>
                    <td>{data['Name']}</td>
                    <td>{data['Schedule State']}</td>
                    <td>{data['Plan Estimate']}</td>
                    <td>{data['Task Estimate Total']}</td>
                    <td>{data['Task Actual Total']}</td>
                    <td>{data['Task Remaining Total']}</td>
                    <td>{data['Owner']}</td>
                    <td>{data['Tags']}</td>
                    <td>{data['Ready']}</td>
                </tr></tbody>
            )
        })
    }

    onChangeID(val) {
        const data = this.state.rawData.filter(e => e['Formatted ID'].includes((val.target.value).toUpperCase()));
         this.setState({
            formattedid: val.target.value,
            jsonData: data
        })
        this.loadOndata()
    }

    onChangeSchedule(val) {
        const data=this.state.rawData.filter(e => {
            if(e['Schedule State'])
            return e['Schedule State'].includes((val.target.value).toUpperCase())
            return console.log(e);
        });

        this.setState({
            scheduleState: val.target.value,
            jsonData: data
        })
        this.loadOndata()
    }

    onChangeOwner(val) {
        const ownerData=this.state.rawData.filter(e => {
            if(e['Owner'])
                return e['Owner'].includes((val.target.value).toUpperCase())
            return console.log(e);
        });

        this.setState({
            owner: val.target.value,
            jsonData: ownerData
        })
        this.loadOndata()
    }

    csvJSON(csvf) {
        var reader = new FileReader();
        let filecontent;
        reader.onload = (evt) => {
            if (evt.target.readyState !== 2) return;
            if (evt.target.error) {
                alert('Error while reading file');
                return;
            }
            filecontent = evt.target.result;
            //console.log(filecontent)
            const {data} = Papa.parse(filecontent, {header: true})

            this.setState({
                rawData: data,
                jsonData: data
            })
            console.log(Papa.parse(filecontent, {header: true}))
            console.log(this.state.jsonData)
            var s = this.state.jsonData.filter(e => console.log(e['Schedule State']) === 'Defined')
            console.log('state', s)
        };
        reader.readAsText(csvf.target.files[0]);


    }

    loadOndata(){
        this.onAddInProgress=this.OnAddInProgress()
        this.onAddDefined=this.OnAddDefined()
        this.onAddAccepted=this.OnAddAccepted()
        this.onAddComleted=this.OnAddComleted()
    }

    OnAddInProgress() {
        let s = 0;
        this.state.jsonData.map(e => {
            if (e['Plan Estimate'] === 'InProgress')
                s += e['Plan Estimate'];

            return console.log(e);

        });
        return s
    }

    OnAddDefined() {
        console.log("working"+this.state.jsonData);
        let s = 0;
        this.state.jsonData.map(e => {
            if (e['Plan Estimate'] === 'Defined')
                s += e['Plan Estimate'];
            return console.log(e);
        });
        return s
    }

    OnAddAccepted() {
        let s = 0;
        this.state.jsonData.map(e => {
            if (e['Plan Estimate'] === 'Accepted')
                s += e['Plan Estimate'];
            return console.log(e);
        })
        return s
    }

    OnAddComleted() {
        let s = 0;
        this.state.jsonData.map(e => {
            if (e['Plan Estimate'] === 'Completed')
                s += e['Plan Estimate'];
            return console.log(e);
        })
        return s
    }

    render() {
        console.log('render', this.state)
        const header = this.headerData()
        const rowda = this.renderData()
        return (
            <div id="in">
                <div className="App">
                    <div>
                        <h1>ALTIMETRIK INDIA PRIVATE LIMITED</h1>
                        <h2>DASH BOARD</h2>
                        <input type="file" accept=".csv" onChange={(e) => this.csvJSON(e)}/>
                    </div>
                    <div>
                        <input type="text"
                               placeholder="FilterBy Formatted Id.."
                               value={this.state.formattedid}
                               onChange={this.onChangeID.bind(this)}/>

                        <input type="text"
                               placeholder="Search by schedule state..."
                               value={this.state.scheduleState}
                               onChange={this.onChangeSchedule.bind(this)}
                        />
                        <input type="text"
                               value={this.state.owner}
                               placeholder="Search by owner..."
                               onChange={this.onChangeOwner.bind(this)}
                        />
                    </div>
                    <div className="hrLine">
                        <hr/>
                    </div>
                    <div className="totalDetals">
                        <table id="details">
                            <tbody>
                            <tr>
                                <td>
                                    <div className="totalDetals">
                                        <h2>Total PlanEstimate according to schedulestates :</h2>
                                        <table align='center'>
                                            <tbody>
                                            <tr>
                                                <th>InProgress</th>
                                                <th>Defined</th>
                                                <th>Accepted</th>
                                                <th>Completed</th>
                                                <th>Total</th>
                                            </tr>
                                            <tr>
                                                <td>{this.onAddInProgress}</td>
                                                <td>{this.onAddDefined}</td>
                                                <td>{this.onAddAccepted}</td>
                                                <td>{this.onAddComleted}</td>
                                                <td>{this.onAddInProgress + this.onAddDefined + this.onAddAccepted + this.onAddComleted}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <table>
                        {header}
                        {rowda}
                    </table>
                </div>
            </div>
        );
    }
}

export default App;