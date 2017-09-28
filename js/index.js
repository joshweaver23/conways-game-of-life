var golApp = angular.module('golApp', []);
golApp.controller('golCtrl', function golCtrl($scope, $interval) {

    $scope.createBoard = function () {
        $scope.board = init($scope.height, $scope.width);
    };
  
    $scope.start = function() {
      if ($scope.running) {
        $interval.cancel($scope.timer);
        $scope.running = false;
        return;
      }
      $scope.running = true;
      $scope.timer = $interval(function() {
            $scope.board = computeNext($scope.board);
      }, 500);
      
      
    };
    
    $scope.toggle = function (row, cell) {      
        $scope.board[row][cell] = !$scope.board[row][cell];
    };
    
    $scope.cellClass = function (row, cell) {
        if (alive($scope.board, row, cell)) {
          return "alive";
        }
        return "";
    };

    $scope.running = false;
    $scope.height = 15;
    $scope.width = 15;
    $scope.createBoard();
    
    function init(height, width) {
        var board = [];
        for (var h = 0 ; h < height ; h++) {
            var row = [];
            for (var w = 0 ; w < width ; w++) {
                row.push(false);
            }
            board.push(row); 
        }
        return board;
    }
    
    function computeNext(board) {
        var newBoard = [];
        for (var r = 0 ; r < board.length ; r++) {
            var newRow = [];
            for (var c = 0 ; c < board[r].length ; c++) {
                newRow.push(willLive(board, r, c) || newCell(board, r, c));
            }
            newBoard.push(newRow); 
        }
        return newBoard;
    }
    
    function willLive(board, row, cell) {
        return alive(board, row, cell) 
            && neighbours(board, row, cell) >= 2 
            && neighbours(board, row, cell) <= 3;
    }
  
    function newCell(board, row, cell) {
        return !alive(board, row, cell) 
            && neighbours(board, row, cell) == 3;
    }
    
    function neighbours(board, row, cell) {
        var n = 0;
        n += alive(board, row-1, cell-1) ? 1 : 0;
        n += alive(board, row-1, cell+0) ? 1 : 0;
        n += alive(board, row-1, cell+1) ? 1 : 0;
        n += alive(board, row+0, cell-1) ? 1 : 0;
        n += alive(board, row+0, cell+1) ? 1 : 0;
        n += alive(board, row+1, cell-1) ? 1 : 0;
        n += alive(board, row+1, cell+0) ? 1 : 0;
        n += alive(board, row+1, cell+1) ? 1 : 0;
        return n;
    }
    
    function alive(board, row, cell) {
        return (row >= 0   && row < board.length &&
                cell >= 0  && cell < board[row].length &&
                board[row][cell]);
    }
})