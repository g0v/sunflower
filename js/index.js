$(document).ready(function ()
{
	var sW = $(window).width();
	var sH = $(window).height();
	$(window).resize(function()
	{
		sW = $(window).width();
		sH = $(window).height();
		$('body').width(sW).height(sH);
		$('#content').width(sW-420);
		$('.blocks').height($(".album").height());
	});
	
	$(window).resize();
//$('#content').hide();
	
	var setContentBlock = function()
	{
		console.log('setContentBlock');
		var tabs = ["news","comment","media",];
		var block = $('#content .blocks');
		
		block.find('.tabs .tab').bind('click',OnTab);
		block.find('.tabs .tab.'+tabs[0]).click();

		function OnTab()
		{
			var tab_name = $(this).attr('class').replace('tab ','');
			block.find('.lists .list').hide();
			block.find('.lists .list.'+tab_name).show();
		}
	}();
	var setTimeLine = function()
	{
		var pole  = $('#timeline .pole');
		var dates = $('#timeline .dates');
		
		dates.html('');
		$(document).on('click','.events .event',OnClickEvent);
	
		$.ajax({url:'data/events.html',success:OnGotData});
		function OnGotData(msg)
		{
			var list = $.parseJSON(msg);
			var now = { yyyy:0 , mm:0 , dd:0 };
			
			// Create Dates
			for(var i=0;i<list.length;i++)
			{
				var yyyy = list[i].yyyy;
				var mm = list[i].mm < 10 ? '0' + list[i].mm : list[i].mm;
				var dd = list[i].dd < 10 ? '0' + list[i].dd : list[i].dd;
				var date = yyyy + '-' + mm + '-' + dd;
				
				if ( yyyy != now.yyyy || mm != now.mm || dd != now.dd )
				{
					var elem_date = $('<div id="date_'+ date +'" class="date" />');
					var html = '<div class="label">'+date+'</div><div class="eventsLine"></div>';
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
				id:list[i].id,
				mm:list[i].mm,
				dd:list[i].dd,
				yyyy:list[i].yyyy,
				focus:list[i].focus,
				title:list[i].title };
				
				var yyyy = e.yyyy;
				var mm = e.mm < 10 ? '0' + e.mm : e.mm;
				var dd = e.dd < 10 ? '0' + e.dd : e.dd;
				
				var elem_date = $('#date_'+yyyy + '-' + mm + '-' + dd);
				var events = elem_date.find('.events');
				
				var class_focus = e.focus == 1 ? ' focus' : '';
				
				var html_event = '<div id="event_' + e.id + '" eid="' + e.id + '" class="event' + class_focus + '">';
				html_event += '	<div class="title">' + e.title + '</div>';
				html_event += '</div>';
				events.append(html_event);
			}
			pole.height(dates.height());
		}
		function OnClickEvent()
		{
			var eid_A = $(this).attr('eid')
			var eid_B = $('#content').attr('eid');
			if ( eid_A != eid_B ){ reloadContent(); }
		}
		function reloadContent()
		{
			var content = $('#content');
			var eid = content.attr('eid');
			content.show();
			$.ajax({url:'data/get_event_data.php?eid='+eid,success:OnGotEventData});
			function OnGotEventData(msg)
			{
				var data = $.parseJSON(msg);
				content.find('.what .text').html(data.title);
				content.find('.when .text').html(data.date.full);
				content.find('.why .text').html(data.why);
				content.find('.where .text').html(data.place);
				
				content.find('.album .list').html();
				
				var images = data.images;
				for(var i=0;i<images.length;i++)
				{
					var html_img = '<div class="image"><img title="'+images[i].title+'" src="'+images[i].url+'" />';
					content.find('.album .list').append(html_img);
				}
			}
		}
	}();
	
	function getData(url)
	{
		$.ajax({url:url,success:function(msg){return $.parseJSON(msg);}});
	}
});