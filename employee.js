class ATMEmployee {
    notes = {
        1000: {
            note: 1000,
            status: false,
            count: 0,
            countPaid: 0
        },
        2000: {
            note: 2000,
            status: false,
            count: 0,
            countPaid: 0
        },
        5000: {
            note: 5000,
            status: false,
            count: 0,
            countPaid: 0
        },
        10000: {
            note: 10000,
            status: false,
            count: 0,
            countPaid: 0
        },
        50000: {
            note: 50000,
            status: false,
            count: 0,
            countPaid: 0
        }
    };
    paidCounts = [];

    constructor() {
        this.getStorage();
        this.showHistory();

        this.render();
    }

    showHistory(){
        let historyHtml = '';
        let totalPaid = 0;
        Object.keys(this.notes).forEach(note => {
            if(this.notes[note].countPaid){
                historyHtml += `<li>در مجموع ${this.notes[note].countPaid} عدد اسکناس ${note} تومانی پرداخت شده است.</li>`
                totalPaid += this.notes[note].countPaid * note;
            }
        });

        historyHtml += `<li>در مجموع ${totalPaid} تومان پرداخت شده است.</li>`;

        let recordsHtml = '';
        this.paidCounts.forEach(obj => {
            Object.keys(obj).forEach(note => {
                recordsHtml += `<li>${obj[note]} عدد اسکناس ${note} تومانی پرداخت گردید.</li>`;
            })
        })

        return [historyHtml, recordsHtml];
    }

    getStorage() {
        const notes = localStorage.getItem('notes')
        if (notes)
            this.notes = JSON.parse(notes)
        const paid = localStorage.getItem('paidCounts')
        if (paid)
            this.paidCounts = JSON.parse(paid)
    }

    setStorage() {
        localStorage.setItem('notes', JSON.stringify(this.notes))
    }

    confirm() {
        const inputs = document.getElementsByClassName('form-control')
        console.log(inputs)
        for (let i = 0; i < inputs.length; i++) {
            const noteAmount = inputs[i].getAttribute('data-note')
            const count = inputs[i].value
            console.log(count);

            this.notes[noteAmount].count = parseInt(count)
        }

        [...document.getElementsByClassName('form-check-input')]
            .forEach(checkbox => {
                const noteAmount = checkbox.getAttribute('data-note')
                const status = checkbox.checked

                this.notes[noteAmount].status = status
                // this.notes = this.notes.map(note => {
                //     if (note.note == noteAmount) {
                //         note.status = status
                //         console.log(status)
                //     }
                //
                //     return note
                // })

                // console.log(`${note} -> ${status}`)
            })

        this.setStorage()
    }

    render() {

        console.log(this.notes)

        let notesHtml = ''

        Object.keys(this.notes).forEach(note => {
            notesHtml += `
                <div class="col">
                    <div class="card">
                        <img src="images/note_${note}.jpg" class="card-img-top">
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <h5 class="card-title">
                                        <span>${note}</span>
                                        <span>تومان</span>
                                    </h5>
                                </div>
                                <div class="col-1">
                                    <input type="checkbox" class="form-check-input" data-note="${note}" ${this.notes[note].status ? 'checked' : ''}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">تعداد</span>
                            </div>
                            <input type="text" class="form-control" value="${this.notes[note].count}" data-note="${note}">
                        </div>
                    </div>
                </div>
            `
        })

        document.getElementById('notes')
            .innerHTML = notesHtml;

        let historyHtml, recordsHtml;
        [historyHtml, recordsHtml] = this.showHistory();
        document.getElementById('history')
            .innerHTML = historyHtml;
        document.getElementById('records')
            .innerHTML = recordsHtml;
    }
}

const employee = new ATMEmployee()
