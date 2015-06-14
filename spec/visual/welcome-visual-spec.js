casper.thenOpen('http://localhost:9000/')
	.then(function() {
	  phantomcss.screenshot('h1', 'welcome-title');
	}).then(function() {
	  phantomcss.screenshot('p', 'welcome-message');
	}).then(function() {
	  phantomcss.screenshot('p + p', 'welcome-version');
	});