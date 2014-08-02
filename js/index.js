$(document).ready(function ()
{
    init_view_character();
    init_view_files();

	var sW = $(window).width();
	var sH = $(window).height();
	$(window).resize(function()
	{
		sW = $(window).width();
		sH = $(window).height();

		// Fixed .content width
		$.each($('.content'),function (){
		var adj_w = 74;
		$(this).width(sW-adj_w-$(this).siblings('.timeline').width()); });

		$('body').width(sW).height(sH);
	});

	$(window).resize();

	var setMenu = function()
	{
		$('#menu > li').bind('click',OnSwitchCategory);
		$('.view').hide();
		$('#gist').show();
		function OnSwitchCategory()
		{
    		var tab      = $(this).attr('tab');
    		var view     = $('#'+tab);
    		var pole     = view.find('.pole');
    	    var content  = view.find('.content');
    		var timeline = view.find('.timeline');

    		$('.view').hide();
    		$('.view .content').hide();

    	    view.show();
		}
	}();
	var setTimeline = function()
	{
		var content_tabs = ["news","media"];
	    $.each($('.view.has_timeline'),init);


	    function init()
	    {
	        var view_id  = $(this).attr('id');
	        var content  = $(this).find('.content');
	        var timeline = $(this).find('.timeline');
	        var pole     = timeline.find('.pole');
    		var dates    = timeline.find('.dates');
			var block_O = content.find('.block.others');

			// Event Listeners
    		$(document).on('click','.events .event',OnClickEvent);

			// Actions
    		dates.html('');
    		content.hide();
			set_mouse_effect();

			// Set Pole
			var timer = setInterval(function(){
			pole.height(pole.closest('.view').height()+50);
			},1000);

			// Set Block Others
			block_O.find('.tabs .tab').bind('click',OnTab);
			block_O.find('.tabs .tab.' + content_tabs[0]).click();

			function OnTab()
			{
				$(this).siblings('.tab').removeClass('focus');
				$(this).addClass('focus');

				var tab_name = $(this).attr('class').replace('tab ','');
				block_O.find('.lists .list').hide();
				block_O.find('.lists .list.'+tab_name).show();
			}

    		$.ajax({url:'http://sunflower-documentary-api.herokuapp.com/api/1.0/timeline',success:OnGotData});
    		function OnGotData(msg)
    		{
    			var list = msg;
    			var now = { yyyy:0 , mm:0 , dd:0 };

    			// Create Dates
    			for(var i=0;i<list.length;i++)
    			{
    				var yyyy = list[i].date.yyyy;
    				var mm = list[i].date.mm < 10 ? '0' + list[i].date.mm : list[i].date.mm;
    				var dd = list[i].date.dd < 10 ? '0' + list[i].date.dd : list[i].date.dd;
    				var date = yyyy + '-' + mm + '-' + dd;

    				if ( yyyy != now.yyyy || mm != now.mm || dd != now.dd )
    				{
    					var elem_date = $('<div class="date date_'+ date +'" class="date"></div>');
    					var html = '<div class="label">'+date+'</div>';
						html += '<div class="dash"></div>';
						html += '<div class="events"></div>';

    					elem_date.html(html);
    					elem_date.attr('date-yyyy',yyyy);
    					elem_date.attr('date-mm',mm);
    					elem_date.attr('date-dd',dd);
    					dates.append(elem_date);

    					now.yyyy = yyyy;
    					now.mm   = mm;
    					now.dd   = dd;
    				}
    			}
    			// Create Events
    			for(i=0;i<list.length;i++)
    			{
    				var e = {
    				id:list[i].event_id,
    				mm:list[i].date.mm,
    				dd:list[i].date.dd,
    				yyyy:list[i].date.yyyy,
    				focus:list[i].focus,
    				title:list[i].title };

    				var yyyy = e.yyyy;
    				var mm = e.mm < 10 ? '0' + e.mm : e.mm;
    				var dd = e.dd < 10 ? '0' + e.dd : e.dd;

    				var events = dates.find('.date_'+yyyy + '-' + mm + '-' + dd).find('.events');

    				var class_focus = e.focus == 1 ? ' focus' : '';

    				var html_event = '<div id="event_' + e.id + '" eid="' + e.id + '" class="event' + class_focus + '">';
    				html_event += '	<div class="title">' + e.title + '</div>';
    				html_event += '</div>';
    				events.append(html_event);
    			}
    		}
    		function OnClickEvent()
    		{
    			var eid = $(this).attr('eid');
    			content.attr('eid',eid);
    			reloadContent();
    		}
    		function reloadContent()
    		{
    			var eid = content.attr('eid');
    			content.show();
    			$.ajax({url:'data/get_event_data.php?eid='+eid,success:OnGotEventData});
    			function OnGotEventData(msg)
    			{
    				var data = $.parseJSON(msg);
    				content.find('.block.info .site .text').html(data.site);
    				content.find('.block.info .date .text').html(data.date.full);
    				content.find('.block.description .text').html(data.description);
    				content.find('.block.album img.thumbnail').attr("src",data.thumbnail);
    			}
    		}
			function set_mouse_effect()
			{
				console.log(timeline.attr('class'));
				console.log(timeline.find('.event').length);
				return;
				timeline.find('.event').hover( mouse_in , mouse_out );

				function mouse_in(){ console.log('mouse_in'); }
				function mouse_out(){ console.log('mouse_out'); }
			}
		}
	}();
});
