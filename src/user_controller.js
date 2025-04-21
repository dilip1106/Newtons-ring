(function(){
    angular
    .module('users',['FBAngular'])
    .controller('UserController', [
        '$mdSidenav', '$mdBottomSheet', '$log', '$q','$scope','$element','Fullscreen','$mdToast','$animate',
        UserController
    ]);	
    /**
    * Main Controller for the Angular Material Starter App
    * @param $scope
    * @param $mdSidenav
    * @param avatarsService
    * @constructor
    */
	function UserController( $mdSidenav, $mdBottomSheet, $log, $q, $scope, $element, Fullscreen, $mdToast, $animate) {
		$scope.divshow = false; /** It hides the 'side navigate' tab */
        $scope.toastPosition = {
            bottom: true,
            top: false,
            left: true,
            right: false
        };
        $scope.toggleSidenav = function(ev) {
            $mdSidenav('right').toggle();
        };
        $scope.getToastPosition = function() {
            return Object.keys($scope.toastPosition)
            .filter(function(pos) { return $scope.toastPosition[pos]; })
            .join(' ');
        };
        $scope.showActionToast = function() {        
            var toast = $mdToast.simple()
            .content(help_array[0])
            .action(help_array[7])
            .hideDelay(15000)
            .highlightAction(false)
            .position($scope.getToastPosition());
        
            var toast1 = $mdToast.simple()
            .content(help_array[1])
            .action(help_array[7])
            .hideDelay(15000)
            .highlightAction(false)
            .position($scope.getToastPosition());
          
            var toast2 = $mdToast.simple()
            .content(help_array[2])
            .action(help_array[7])
            .hideDelay(15000)
            .highlightAction(false)
            .position($scope.getToastPosition());
            
            var toast3 = $mdToast.simple()
            .content(help_array[3])
            .action(help_array[7])
            .hideDelay(15000)
            .highlightAction(false)
            .position($scope.getToastPosition());
			
			var toast4 = $mdToast.simple()
            .content(help_array[4])
            .action(help_array[7])
            .hideDelay(15000)
            .highlightAction(false)
            .position($scope.getToastPosition());
			
			var toast5 = $mdToast.simple()
            .content(help_array[5])
            .action(help_array[7])
            .hideDelay(15000)
            .highlightAction(false)
            .position($scope.getToastPosition());
            
			var toast6 = $mdToast.simple()
            .content(help_array[6])
            .action(help_array[8])
            .hideDelay(15000)
            .highlightAction(false)
            .position($scope.getToastPosition());      

            $mdToast.show(toast).then(function() {
                $mdToast.show(toast1).then(function() {
                    $mdToast.show(toast2).then(function() {
                        $mdToast.show(toast3).then(function() {
							$mdToast.show(toast4).then(function() {
								$mdToast.show(toast5).then(function() {
									$mdToast.show(toast6).then(function() {
									});
								});
							}); 
                        });
                    });
                });
            });     
        };
  
        var self = this;
        self.selected     = null;
        self.users        = [ ];
        self.toggleList   = toggleUsersList;  	
		$scope.pause_ctrls_disable = true; /** It disable the pause button */
		$scope.showValue = false; /** It hides the 'Control' tab */
        $scope.showVariables = false; /** I hides the 'Variables' tab */
		$scope.isActive = true;
        $scope.isActive1 = true;
        $scope.goFullscreen = function () {
            /** Full screen */
            if (Fullscreen.isEnabled())
                Fullscreen.cancel();
            else
                Fullscreen.all();
            /** Set Full screen to a specific element (bad practice) */
            /** Full screen.enable( document.getElementById('img') ) */
        };

        // In your initialization code:
        $scope.medium_Mdl = 'air';  // or whatever value represents air in your system
        $scope.source_Mdl = 'sodium';  // or whatever value represents sodium in your system
 
        /** Click event function of the Reset button */
        $scope.resetExp = function() {
            resetExperiment($scope); /** Function defined in view.js file */
			$mdToast.cancel();
        };
		/** Change event function of the check box Show result */
		$scope.showResult = function() {
			showResultFn($scope); /** Function defined in experiment.js file */
		}				

		/** Change event function of Population drop down */
		$scope.setMedium = function() {
			setMediumFn($scope); /** Function defined in view.js file */
        };
		
		$scope.setSource = function() {
			setSourceFn($scope); /** Function defined in view.js file */
        };
		
		$scope.setFocus = function() {
			setFocusFn($scope); /** Function defined in view.js file */
        };
		
		$scope.lightOn = function() {
			lightOnFn($scope); /** Function defined in view.js file */
        };
		
		$scope.setRadius = function() {
			setRadiusFn($scope); /** Function defined in view.js file */
        };
		
		/** Change event function of adjust microscope position */
		$scope.adjustMicroscopePosition = function() {
			adjustMicroscopePositionFn($scope); /** Function defined in view.js file */
		}
		
		$scope.toggle = function() {
			$scope.showValue = !$scope.showValue;
			$scope.isActive = !$scope.isActive;
		};
		
		$scope.toggle1 = function() {
			$scope.showVariables = !$scope.showVariables;
			$scope.isActive1 = !$scope.isActive1;
		};
		
        $scope.table1 = {
            msr: new Array(10),
            vsd: new Array(10),
            vsrVsd: new Array(10),
            tr: new Array(10)
        };

        $scope.calculateTable1Values = function(index) {
            if ($scope.table1.msr[index] !== undefined && $scope.table1.vsd[index] !== undefined) {
                // Calculate VSR-VSD X LC
                $scope.table1.vsrVsd[index] = (( $scope.table1.vsd[index]) * 0.001).toFixed(3);
                
                // Calculate TR=MSR+ VSR
                $scope.table1.tr[index] = ($scope.table1.msr[index] + parseFloat($scope.table1.vsrVsd[index])).toFixed(3);
            }
        };

        $scope.table2 = {
            readings: {},
            diameter: {},
            dSquared: {},
            difference: {}
        };

        $scope.calculateValues = function(n) {
            if ($scope.table2.diameter[n] !== undefined) {
                // Calculate D²
                $scope.table2.dSquared[n] = Math.pow(parseFloat($scope.table2.diameter[n]), 2).toFixed(3);
                
                // Set the reading value (half of diameter)
                $scope.table2.readings[n] = (parseFloat($scope.table2.diameter[n]) / 2).toFixed(3);
                
                // Calculate (D²m+n-D²m) for current and next rows
                let currentIndex = [10,8,6,4,2].indexOf(n);
                if (currentIndex < 4) { // All rows except last
                    let nextN = [10,8,6,4,2][currentIndex + 1];
                    
                    if ($scope.table2.dSquared[n] && $scope.table2.dSquared[nextN]) {
                        // For row n, calculate D²n - D²n+2
                        
                            $scope.table2.difference[n] = (
                                parseFloat($scope.table2.dSquared[n]) - 
                                parseFloat($scope.table2.dSquared[nextN])
                            ).toFixed(3);
                        
                        
                    }
                }
                
                // Update previous row's difference if this is a new entry
                let prevIndex = [10,8,6,4,2].indexOf(n) - 1;
                if (prevIndex >= 0) {
                    let prevN = [10,8,6,4,2][prevIndex];
                    if ($scope.table2.dSquared[prevN]) {
                        $scope.table2.difference[prevN] = (
                            parseFloat($scope.table2.dSquared[prevN]) - 
                            parseFloat($scope.table2.dSquared[n])
                        ).toFixed(3);
                    }
                }
            }
        };

        $scope.downloadTables = function() {
            const doc = new jspdf.jsPDF();
            
            // Title
            doc.text("Newton's Rings - Observation Tables", 14, 15);
            
            // Table 1
            doc.text("Table 1", 14, 25);
            const headers1 = [['Sr. No', 'Fringe Number', 'MSR (cm)', 'VSD (cm)', 'VSR-VSD X LC (cm)', 'TR=MSR+ VSR (cm)']];
            const data1 = [];
            
            for(let i = 1; i <= 10; i++) {
                data1.push([
                    i,
                    i <= 5 ? 'L' + i : 'R' + (i-5),
                    $scope.table1.msr[i-1] || '',
                    $scope.table1.vsd[i-1] || '',
                    $scope.table1.vsrVsd[i-1] || '',
                    $scope.table1.tr[i-1] || ''
                ]);
            }
            
            doc.autoTable({
                head: headers1,
                body: data1,
                startY: 30,
                theme: 'grid',
                margin: { top: 30 },
                tableWidth: 'auto'
            });
            
            // Table 2
            doc.text("Table 2", 14, doc.previousAutoTable.finalY + 15);
            const headers2 = [['Order of ring', 'Left', 'Right', 'Diameter D(cm)', 'D²(cm²)', '(D²m+n-D²m)']];
            const data2 = [];
            
            [10,8,6,4,2].forEach(n => {
                data2.push([
                    n,
                    'L' + n,
                    'R' + n,
                    $scope.table2.diameter[n] || '',
                    $scope.table2.dSquared[n] || '',
                    $scope.table2.difference[n] || ''
                ]);
            });
            
            doc.autoTable({
                head: headers2,
                body: data2,
                startY: doc.previousAutoTable.finalY + 20,
                theme: 'grid',
                margin: { top: 30 },
                tableWidth: 'auto'
            });
            
            // Save the PDF
            doc.save('newton_rings_tables.pdf');
        };

        /**
        * First hide the bottom sheet IF visible, then
        * hide or Show the 'left' sideNav area
        */
        function toggleUsersList() {
			$mdSidenav('right').toggle();
        }
    }
})();