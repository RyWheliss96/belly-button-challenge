const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function(data) {
    console.log(data);
    
    //Set Dropdown values
    for(let i=0;i<data.names.length;i++){
        d3.select("#selDataset").append('option').text(data.names[i])
    };

    // Slice the data
    let sample_values = data.samples[0].sample_values.slice(0,10);
    let otu_ids = data.samples[0].otu_ids.slice(0,10);
    let otu_labels = data.samples[0].otu_labels.slice(0,10);

    //Convert IDs to Strin formatted OTU _____
    for(let i = 0; i<otu_ids.length;i++){
        otu_ids[i]= "OTU " + String(otu_ids[i])
    };

    //Convert labels to better format
    for(let i = 0; i<otu_labels.length;i++){
        otu_labels[i] = otu_labels[i].replaceAll(";"," ");
        otu_labels[i] = otu_labels[i].replace("Bacteria","Bacteria:");
    };

    //reverse the values to be in descending order
    sample_values.reverse();
    otu_ids.reverse();
    otu_labels.reverse();

    //Intialize plots
    function init() {
        //Data for Horizontal bar graph
        let data1 = [{
          x: sample_values,
          y: otu_ids,
          hovertemplate: '<b>OTU ID</b>: %{y}<br>' +
                        '<b>Value</b>: %{x}<br>' +
                        '<b>%{text}</b>',
          text: otu_labels,
          type: "bar",
          orientation:"h"
        }];
        
        //Make layout bigger so you can view hover text
        let layout1 ={
            width: 700
        }
        
        //Plot Horizontal Bar Graph
        Plotly.newPlot("bar", data1, layout1);

        //Convert labels to better format
        let labels = data.samples[0].otu_labels;
        for(let i = 0; i<labels.length;i++){
            labels[i] = labels[i].replaceAll(";"," ");
            labels[i] = labels[i].replace("Bacteria","Bacteria:");
        };

        //Data for Bubble Graph
        let data2 = [{
            x: data.samples[0].otu_ids,
            y: data.samples[0].sample_values,
            mode: 'markers',
            marker: {
                color: data.samples[0].otu_ids,
                size: data.samples[0].sample_values
            },
            hovertemplate: '<i>OTU ID</i>: %{x}<br>' +
                        '<b>Value</b>: %{y}<br>' +
                        '<b>%{text}</b>',
            text: data.samples[0].otu_labels,
            type: 'scatter'
        }];
       
        //Plot Bubble Graph
        Plotly.newPlot("bubble", data2);


        let li1 = d3.select(".panel-body").append("div").text("id: " + String(data.metadata[0].id));
        let li2 = d3.select(".panel-body").append("div").text("ethnicity: "+ String(data.metadata[0].ethnicity));
        let li3 = d3.select(".panel-body").append("div").text("gender: "+ String(data.metadata[0].gender));
        let li4 = d3.select(".panel-body").append("div").text("age: "+ String(data.metadata[0].age));
        let li5 = d3.select(".panel-body").append("div").text("location: "+ String(data.metadata[0].location));
        let li6 = d3.select(".panel-body").append("div").text("bbtype: "+ String(data.metadata[0].bbtype));
        let li7 = d3.select(".panel-body").append("div").text("wfreq: "+ String(data.metadata[0].wfreq));

        li1.attr('class','id');
        li2.attr('class','ethnicity');
        li3.attr('class','gender');
        li4.attr('class','age');
        li5.attr('class','location');
        li6.attr('class','bbtype');
        li7.attr('class','wfreq');

    };

    d3.selectAll("#selDataset").on("change", updatePlotly);

    // This function is called when a dropdown menu item is selected
    function updatePlotly() {
        // Use D3 to select the dropdown menu
        let dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        let dataset = dropdownMenu.property("value");
        
        let name_value = 0;

        for(let i=0;i<data.names.length;i++){
            if(data.names[i]==dataset){
                name_value= i;
            };
        };

        // Slice the data
        sample_values = data.samples[name_value].sample_values.slice(0,10);
        otu_ids = data.samples[name_value].otu_ids.slice(0,10);
        otu_labels = data.samples[name_value].otu_labels.slice(0,10);

        //Convert IDs to Strin formatted OTU _____
        for(let i = 0; i<otu_ids.length;i++){
            otu_ids[i]= "OTU " + String(otu_ids[i])
        };

        //Convert labels to better format
        for(let i = 0; i<otu_labels.length;i++){
            otu_labels[i] = otu_labels[i].replaceAll(";"," ");
            otu_labels[i] = otu_labels[i].replace("Bacteria","Bacteria:");
        };

        //reverse the values to be in descending order
        sample_values.reverse();
        otu_ids.reverse();
        otu_labels.reverse();
    
        // restyle horizontal bar
        Plotly.restyle("bar", "x", [sample_values]);
        Plotly.restyle("bar", "y", [otu_ids]);
        Plotly.restyle("bar", "text", [otu_labels]);

        //restyle bubble graph
        Plotly.restyle("bubble", "x", [data.samples[name_value].otu_ids]);
        Plotly.restyle("bubble", "y", [data.samples[name_value].sample_values]);
        Plotly.restyle("bubble", "marker.size", [data.samples[name_value].sample_values]);
        Plotly.restyle("bubble", "marker.color", [data.samples[name_value].otu_ids]);
        Plotly.restyle("bubble", "text", [data.samples[name_value].otu_labels]);
        

        d3.select('.id').text("id: " + String(data.metadata[name_value].id));
        d3.select('.ethnicity').text("ethnicity: "+ String(data.metadata[name_value].ethnicity));
        d3.select('.gender').text("gender: "+ String(data.metadata[name_value].gender));
        d3.select('.age').text("age: "+ String(data.metadata[name_value].age));
        d3.select('.location').text("location: "+ String(data.metadata[name_value].location));
        d3.select('.bbtype').text("bbtype: "+ String(data.metadata[name_value].bbtype));
        d3.select('.wfreq').text("wfreq: "+ String(data.metadata[name_value].wfreq));
    }
    
    init();

});

