//READ THE DOCS FOR UNDERSTANDING AND MORE

    class Voter {
        #Name;
        #Email;
        #VoterId
        constructor(Name , Email , id) {
            this.#Name = Name;
            this.#Email = Email;
            this.#VoterId = id;
        }
    }
    class participant {
        #Name;
        #Email;
        #ParticipantId
        #totalVotes;
        #Rank;
        constructor(Name , Email , id) {
            this.#Name = Name;
            this.#Email = Email;
            this.#ParticipantId = id;
        }
    }

    class LeaderBoard {
        #votes // {voterId : {ParticipantId , score}}
        #participantScore // {ParticipantId : totalScore}
        constructor() {
            this.#votes = {};
            this.#participantScore = {};
        }

        addVote(voterId , ParticipantId , score) {
            if(score < 0 || score > 100 || !score || !ParticipantId || !voterId) return;
            if(this.#votes[voterId]) {
                this.#removeVote(voterId);
            }
            score = parseInt(score);
            this.#votes[voterId] = {ParticipantId , score};
            if(!this.#participantScore[ParticipantId]) {
                this.#participantScore[ParticipantId] = 0;
            }
            this.#participantScore[ParticipantId] += Number(score);
        }
        #removeVote(voterId) {
            if(this.#votes[voterId]) {
                let { ParticipantId, score } = this.#votes[voterId];
                if(this.#participantScore[ParticipantId]) {
                    this.#participantScore[ParticipantId] -= Number(score);
                }
            }
        }
        getAllRanks() {
            const sortedParticipants = Object.entries(this.#participantScore)
            .sort((a, b) => b[1] - a[1]) 
            .map(([participantId, score] , index) => ({rank:index + 1 , participantId, score}));
            return sortedParticipants;
        }

    }
    //ALSO MAKE A CLASS OR SIMPLE WHERE WE STORE ALL VOTERS AND PARTICIPANTS AND ADD FEATURE LIKE ADD/REMOVE VOTER/PARTICIPANTS;
    let leaderBoard = new LeaderBoard();
    leaderBoard.addVote(1,1,50); // {participant : 1 - 50}
    leaderBoard.addVote(2,1,40); //{participant : 1 - 90}
    leaderBoard.addVote(1,2,60); //{participant : 1 - 40 2 -60}
    leaderBoard.addVote(3,3,100);
    console.log(leaderBoard.getAllRanks());

