class ATM {
    notes = {}
    activeNotes = []
    notesCount = {}
    paidCounts =[];

    constructor() {
        this.getStorage()

        this.render()
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
        localStorage.setItem('paidCounts', JSON.stringify(this.paidCounts))
    }

    toggleNote(note) {
        const index = this.activeNotes.indexOf(note)

        if (index > -1) {
            this.activeNotes.splice(index, 1)

            return
        }

        this.activeNotes.push(note)

    }

    calculate(amount) {
        this.activeNotes.sort((a, b) => {
            return b - a
        }).forEach(note => {
            this.notesCount[note] = Math.min(parseInt(amount / note), this.notes[note].count)

            amount -= this.notesCount[note] * note
            // amount %= note // amount = amount % note

        })


        if (amount !== 0) {
            this.notesCount = {}


            return false
        }
        this.paidCounts.unshift(this.notesCount);

        return true
    }

    receive() {
        if (!timer.count) {
            alert('مدت زمان شما به پایان رسیده است.')

            return
        }

        const amount = document.getElementById('amount').value
        if (!amount) {
            alert('مبلغ را وارد نمایید.')
            return
        }

        if (!this.activeNotes.length) {
            alert('اسکناس های خود را انتخاب نمایید.')
            return
        }

        if (this.calculate(amount)) {
            Object.keys(this.notesCount)
                .forEach(note => {
                    if (this.notesCount[note]){
                        this.notes[note].countPaid += this.notesCount[note];

                        this.setStorage();

                    }
                    this.notes[note].count -= this.notesCount[note]
                })
            this.setStorage()

            this.renderReceiveNotes()

            return;
        }

        alert('با مبلغ درخواستی اسکناس وجود ندارد.')
    }

    render() {
        let htmlNote = ''
        Object.keys(this.notes)
            .filter(note => {
                // if(this.notes[note].status && this.notes[note].count)
                //     return true
                // return false

                return this.notes[note].status && this.notes[note].count
            })
            .forEach(note => {
                htmlNote += `
                <div class="col">
                    <div class="card">
                        <img src="images/note_${note}.jpg" class="card-img-top">
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <h5 class="card-title">
                                        <span>${note}</span>
                                        <span>تومان</span>
                                        <span>(${this.notes[note].count} تا)</span>
                                    </h5>
                                </div>
                                <div class="col-1">
                                    <input type="checkbox" class="form-check-input" onclick="atm.toggleNote(${note})">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
            })

        document.getElementById('notes')
            .innerHTML = htmlNote
    }

    renderReceiveNotes() {
        let notesHtml = ''
        Object.keys(this.notesCount)
            .filter(note => {
                if (!this.notesCount[note])
                    return false

                return true
            })
            .forEach((note, index) => {
                notesHtml += `
            <tr>
                <td>${index + 1}</td>
                <td>
                    <img src="images/note_${note}.jpg" class="img-fluid">
                </td>
                <td>${this.notesCount[note]}</td>
            </tr>
            `
            })

        document.getElementById('receive-notes').innerHTML = `
            <table class="table border">
                <thead>
                <tr>
                    <td>#</td>
                    <td>اسکناس</td>
                    <td>تعداد</td>
                </tr>
                </thead>
                <tbody>
                    ${notesHtml}
                </tbody>
            </table>
        `
    }
}

const timer = Timer.createDecreaseTimerWithMinuteAndSecond(200, 30)
const atm = new ATM()
