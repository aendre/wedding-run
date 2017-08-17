import Settings from './../settings';

class ToplistService {

	saveScore(playerName,score) {
		// If the name of the player is empty, we do not save it to the toplist
		if (_.isEmpty(playerName)) {
			return;
		}

 		/**
 		 *
 		 *   Save your score using a webservice, for example
		 * 
		 *   $.post(Settings.urls.saveScore,{
 		 *  	'playerName' : playerName
 		 *  	,'score' : score
 		 *   }).done(function(data) {
 		 *   	console.log('data was saved')
		 *   });
		 *
		 **/ 		
	}

	/**
	 * Call your webservice to get the top10 player
	 * Something like this: return $.get(Settings.urls.getTop10);
	 */
	getTop10() {
 		return [
 			{"playerName":"AE","score":"100000"}
 			,{"playerName":"AE","score":"90000"}
 			,{"playerName":"AE","score":"80000"}
 			,{"playerName":"AE","score":"70000"}
 			,{"playerName":"AE","score":"60000"}
 			,{"playerName":"AE","score":"50000"}
 			,{"playerName":"AE","score":"40000"}
 			,{"playerName":"AE","score":"30000"}
 			,{"playerName":"AE","score":"20000"}
 			,{"playerName":"AE","score":"10000"} 			
 		];
	}
}

export default new ToplistService();