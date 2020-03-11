document.addEventListener("DOMContentLoaded", function() 
{
  function loadAnswers()
  {
    wins.push([1, 2, 3]);
    wins.push([4, 5, 6]);
    wins.push([7, 8, 9]);
    wins.push([1, 4, 7]);
    wins.push([2, 5, 8]);
    wins.push([3, 6, 9]);
    wins.push([1, 5, 9]);
    wins.push([3, 5, 7]);
  }

  function init() 
  {
    board = ['', '', '', '', '', '', '', '', ''];
    playerX = new Array();
    playerO = new Array();
    turn = "X";
    win = null;
    render();
  }

  function render() 
  {
    board.forEach(function(mark, index)
    {
      squares[index].textContent = mark;
    });
    if (win == null)
    {
      messages.textContent = `It's ${turn}'s turn`;
    }
    else if (win == "T")
    {
      messages.textContent = "It's a Tie!"
    } 
    else
    {
      messages.textContent = `${win} is the Winner!`
    }
  }

  function handleTurn(event) 
  {
    let index = squares.findIndex(function(square) 
    {
      return square === event.target;
    });
    if(board[index] == '')
    {
      if (turn == "X")
      {
        playerX.push(index+1);
        playerX = playerX.sort();
      }
      else
      {
        playerO.push(index+1);
        playerO = playerO.sort();
      }
      board[index] = turn;
      win = getWin()
      if (turn == "X")
      {
        turn = "O";
      }
      else
      {
        turn = "X";
      }
      render();
    }
  }

  function getWin()
  {
    let winner = null;
    if (turn == "X")
    {
      var playerselect = playerX;
    }
    else
    {
      var playerselect = playerO;
    }
    for (let i = 0; i<wins.length;i++)
    {
      let setFound = true;
      let set = wins[i];
      for (let j = 0; j<set.length;j++)
      {
        let found = false;
        for (let k = 0; k<playerselect.length;k++)
        {
          if(playerselect[k] == set[j])
          {
            found = true;
            break;
          }
        }
        if (found == false)
        {
          setFound = false;
          break;
        }
      }
      if (setFound == true)
      {
        winner = turn;
        break;
      }
    }
    if (winner)
    {
      return winner;  
    }
    else if (board.includes(""))
    {
      return null;
    }
    else
    {
      return "T"
    }

  }
  
  const squares = Array.from(document.querySelectorAll('#board div'));
  const messages = document.querySelector("h2")
  var board;
  var turn = "X";
  document.getElementById('board').addEventListener('click', handleTurn);
  document.getElementById('reset-button').addEventListener('click', init);
  var playerX;
  var playerO;
  var wins = new Array()
  var win = null;
  loadAnswers()
  init();
  render();
});

