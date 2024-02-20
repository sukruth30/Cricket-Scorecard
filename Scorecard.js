let teama=prompt("Enter the name of 1st team");
        let teamb=prompt("Enter the name of 2nd team");
        let overss=prompt("Enter the no.of overs");
        document.getElementById("TEAMA").textContent=teama;
        document.getElementById("TEAMB").textContent=teamb;
        document.getElementById("innings").textContent=overss;
        let total_runs=0;
        let totwickets=0;
        let overs=0;
        let balls=0;
        let totballs=0;
        let player_list=[];
        for(i=0;i<11;i++){
            player_list.push({
                id:i,
                player_name: 'Player '+(i+1),
                player_runs:0,
                player_balls:0,
                player_fours:0,
                player_sixes:0,
                player_SR:0,
            }
            )
        };
        let strike_player = player_list[0];
        let non_strike_player = player_list[1];
        let waiting_player = player_list[2];

        window.onload = function (){
            let tableBody = document.getElementById("tableBody");

            player_list.forEach(player => {
                let row = document.createElement('tr');
                let playernameCell = document.createElement('td');
                playernameCell.textContent = player.player_name;
                row.appendChild(playernameCell);
                let playerrunscell = document.createElement('td');
                playerrunscell.textContent = player.player_runs;
                row.appendChild(playerrunscell);
                let playerballscell = document.createElement('td');
                playerballscell.textContent = player.player_balls;
                row.appendChild(playerballscell);
                let playerfourscell = document.createElement('td');
                playerfourscell.textContent = player.player_fours;
                row.appendChild(playerfourscell);
                let playersixcell = document.createElement('td');
                playersixcell.textContent = player.player_sixes;
                row.appendChild(playersixcell);
                let strikeratecell = document.createElement('td');
                strikeratecell.textContent = player.player_SR;
                row.appendChild(strikeratecell);
                tableBody.appendChild(row);
            })
        }
        function totalruns(a){
            if(a===2 || a===4 || a===6){
                total_runs+=a;
                strike_player.player_runs +=a;
                if(a===4){
                strike_player.player_fours +=1;
                }
                if(a===6){
                strike_player.player_sixes +=1;
                }
                overgalu();
                let crr=(total_runs/(totballs/6)).toFixed(2);
                strike_player.player_SR = ((strike_player.player_runs/strike_player.player_balls)*100).toFixed(2);
                document.getElementById("CRR").textContent=crr;
            }
            else if(a===5){
                total_runs+=0;
                overgalu();
            }
            else if(a===1){
                total_runs+=a;
                strike_player.player_runs +=a;
                overgalu();
                let crr=(total_runs/(totballs/6)).toFixed(2);
                document.getElementById("CRR").textContent=crr;
                let temp = non_strike_player;
                non_strike_player = strike_player;
                strike_player = temp;
            }
            else if(a===0){
                total_runs++;
                let crr=(total_runs/(totballs/6)).toFixed(2);
                document.getElementById("CRR").textContent=crr;
            }
            else{
                total_runs++;
                let crr=(total_runs/(totballs/6)).toFixed(2);
                document.getElementById("CRR").textContent=crr;
                alert("It's a noball")
            }
            document.getElementById('runs').textContent=total_runs;
            updatetable();
        }
        function wicketgalu(){
            totwickets++;
            if(totwickets>=10){
                alert("The innings is over, The target is"+totalruns);
                location.reload();
            }
            document.getElementById("wickets").textContent=totwickets;
            overgalu();
            strike_player=waiting_player;
            waiting_player=player_list[waiting_player.id + 1];
            updatetable();
        }
        function overgalu(){
            balls++;
            totballs++;
            strike_player.player_balls++;
            if(balls>5){
                overs=overs+1;
                balls=0;
                let temp = non_strike_player;
                non_strike_player = strike_player;
                strike_player = temp;
            }
            if(totballs==(overss*6)){
                alert("The innings is over!!")
                location.reload();
            }
            document.getElementById("overs").textContent=overs;
            document.getElementById("balls").textContent=balls;
        }
        function updatetable(){
            let tableRows = document.getElementById('tableBody').getElementsByTagName('tr')
            for(i=0;i<player_list.length;i++){
                let cells = tableRows[i].getElementsByTagName('td');
                cells[1].textContent = player_list[i].player_runs;
                cells[2].textContent = player_list[i].player_balls;
                cells[3].textContent = player_list[i].player_fours;
                cells[4].textContent = player_list[i].player_sixes;
                cells[5].textContent = player_list[i].player_SR;
            }

        }