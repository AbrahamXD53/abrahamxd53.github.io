app.directive('galleryElement', function() { 
  return { 
    restrict: 'E', 
    scope: { 
      data: '=' 
    }, 
    templateUrl: 'assets/js/angular/App/galleryElement.html' 
  }; 
});