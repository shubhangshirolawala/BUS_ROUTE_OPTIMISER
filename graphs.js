document.getElementById('distanceForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var start = (document.getElementById('start').value);
    var end = (document.getElementById('end').value);
    console.log(start)
    
    const result = g.dijkstra(start,end);
    var distance = `Distance: ${result.distance} kilometers`; // Replace with your actual distance string
    var busStops = result.path; // Replace with your actual bus stops array

    // Display distance result
    document.getElementById('result').innerHTML = '<p>' + distance + '</p>';
    // console.log(document.getElementById('busStopsBody'),"sfkjd")
    // Populate bus stops table
    var busStopsBody = document.getElementById('busStopsBody');
    busStopsBody.innerHTML = ''; // Clear previous entries
    // console.log(stops)
    const isEmpty = (obj) => Object.keys(obj).length === 0;
    if(isEmpty(busStops)){alert("No Routes Found")}

    
    busStops.forEach(function(stop) {
       
        //   var stops = stop.split(' to ');
          console.log(stop)
        var newRow = document.createElement('tr');
        newRow.innerHTML = '<td>' + stop.first + '</td><td>' + stop.second + '</td>' +'<td>' + stop.dist + '</td>';
        busStopsBody.appendChild(newRow);
    });
});



class PriorityQueue {
    constructor() {
      this.values = [];
    }
  
    enqueue(val, priority) {
      this.values.push({ val, priority });
      this.sort();
    }
  
    dequeue() {
      return this.values.shift();
    }
  
    sort() {
      this.values.sort((a, b) => a.priority - b.priority);
    }
  }
  
  class Graph {
    constructor() {
      this.adjacencyList = {};
    }
  
    addVertex(vertex) {
      if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
  
    addEdge(vertex1, vertex2, weight) {
      this.adjacencyList[vertex1].push({ node: vertex2, weight });
      this.adjacencyList[vertex2].push({ node: vertex1, weight });
    }
  
    dijkstra(start, finish) {
      const nodes = new PriorityQueue();
      const distances = {};
      const previous = {};
      let path = []; // to return at the end
      let smallest;
      let totalDistance = 0;
  
      // Build up initial state
      for (let vertex in this.adjacencyList) {
        if (vertex === start) {
          distances[vertex] = 0;
          nodes.enqueue(vertex, 0);
        } else {
          distances[vertex] = Infinity;
          nodes.enqueue(vertex, Infinity);
        }
        previous[vertex] = null;
      }
  
      // As long as there is something to visit
      while (nodes.values.length) {
        smallest = nodes.dequeue().val;
        if (smallest === finish) {
          // We are done
          // Build up path to return at the end
          while (previous[smallest]) {
            let distance=distances[smallest]-distances[previous[smallest]]
            // console.log(dist)
            path.push({second:smallest,first:previous[smallest],dist:distance});
            smallest = previous[smallest];
            // path.push(smallest)
          }
        //   path.push(start);
          console.log(path)
           path.reverse();
          totalDistance = distances[finish];
          break;
        }
  
        if (smallest || distances[smallest] !== Infinity) {
          for (let neighbor in this.adjacencyList[smallest]) {
            // Find neighboring node
            let nextNode = this.adjacencyList[smallest][neighbor];
            // Calculate new distance to neighboring node
            let candidate = distances[smallest] + nextNode.weight;
            let nextNeighbor = nextNode.node;
            if (candidate < distances[nextNeighbor]) {
              // Updating new smallest distance to neighbor
              distances[nextNeighbor] = candidate;
              // Updating previous - How we got to neighbor
              previous[nextNeighbor] = smallest;
              // Enqueue in priority queue with new priority
              nodes.enqueue(nextNeighbor, candidate);
            }
          }
        }
      }
  
      return { path, distance: totalDistance };
    }
  }
  
  // Example Usage:
  const g = new Graph();

  const stopNumberToName = {
    1: "ABC",
    2: "Adabari",
    3: "Adabari_Tiniali",
    4: "AIDC",
    5: "Airport",
    6: "Anuradha",
    7: "Apsara",
    8: "Bamunimaida",
    9: "Basistha_Chariali",
    10: "Beharbari",
    11: "Beltola_Bazar",
    12: "Bhangagarh",
    13: "Bharalumukh",
    14: "Bhootnath",
    15: "Bora_Service",
    16: "Boragaon",
    17: "Chandmari",
    18: "Chariali",
    19: "Christianbasti",
    20: "Church_Field",
    21: "Dakhingaon",
    22: "Dhupguri",
    23: "Dispur",
    24: "Down_Town",
    25: "Fancybazar",
    26: "Farm_Gate",
    27: "Forest_gate",
    28: "Ganesh_Mandir",
    29: "Ganesh_Nagar",
    30: "Ganeshguri",
    31: "Gauhati_High_Court",
    32: "Gauhati_University",
    33: "Gorchuk",
    34: "Guwahati_Club",
    35: "Jagiroad",
    36: "Jalukbari",
    37: "Jatia",
    38: "Jonali",
    39: "Jorabat",
    40: "Kachari",
    41: "Kamakhayagate",
    42: "Kamakhya_Mandir",
    43: "Khanapara",
    44: "Khetri",
    45: "Lachit_Nagar",
    46: "Lachitnagar",
    47: "Lakhtokia",
    48: "Lalganesh",
    49: "Lalmati",
    50: "Last_Gate",
    51: "Lokhra",
    52: "Machkhowa",
    53: "Maligaon",
    54: "Maligaon_Chariali",
    55: "Maligaon_Gate_3",
    56: "Marketing",
    57: "Nalapara",
    58: "Narengi",
    59: "Noonmati",
    60: "Paltanbazar",
    61: "Panbazar",
    62: "Pandu",
    63: "Post_Office",
    64: "Powerhouse",
    65: "Reserve_Bank",
    66: "Rukminigaon",
    67: "Santipur",
    68: "Sarusajai",
    69: "Sector_3",
    70: "Silpukhuri",
    72: "Six_Mile",
    73: "Super_Market",
    74: "Survey",
    75: "Tepesia",
    76: "Tetelia",
    77: "Topatoli",
    78: "Ulubari",
    79: "Vishal_AT_Road",
    80: "Walford",
    81: "Zoo"
  };
  
  // Add vertices
  for (let key in stopNumberToName) {
    g.addVertex(stopNumberToName[key]);
  }
  
  // Add edges
  const addEdge = (vertex1, vertex2, weight) => {
    g.addEdge(vertex1, vertex2, weight);
  };
  
  addEdge("Jalukbari", "Adabari", 1.1);
addEdge("Adabari", "Maligaon_Chariali", 1.2);
addEdge("Maligaon_Chariali", "Maligaon_Gate_3", 1.2);
addEdge("Maligaon_Gate_3", "Kamakhayagate", 1.8);
addEdge("Kamakhayagate", "Bhootnath", 1.5);
addEdge("Bhootnath", "Santipur", 3);
addEdge("Santipur", "Bharalumukh", 2.4);
addEdge("Machkhowa", "Fancybazar", 1.1);
addEdge("Fancybazar", "Panbazar", 0.7);
addEdge("Panbazar", "Kachari", 2);
addEdge("Kachari", "Gauhati_High_Court", 1.4);
addEdge("Gauhati_High_Court", "Reserve_Bank", 2.4);
addEdge("Reserve_Bank", "Lakhtokia", 1);
addEdge("Lakhtokia", "Vishal_AT_Road", 1.2);
addEdge("Vishal_AT_Road", "Paltanbazar", 3.1);
addEdge("Paltanbazar", "Apsara", 1.2);
addEdge("Apsara", "Ulubari", 4.2);
addEdge("Ulubari", "Lachit_Nagar", 2.2);
addEdge("Lachit_Nagar", "Walford", 1.2);
addEdge("Walford", "Ganeshguri", 3.2);
addEdge("Ganeshguri", "Dispur", 2.1);
addEdge("Dispur", "Super_Market", 0.8);
addEdge("Super_Market", "Down_Town", 1.7);
addEdge("Down_Town", "Rukminigaon", 0.9);
addEdge("Rukminigaon", "Six_Mile", 0.9);
addEdge("Six_Mile", "Farm_Gate", 2.1);
addEdge("Farm_Gate", "Khanapara", 3.6);
addEdge("Ganesh_Nagar", "Basistha_Chariali", 1.2);
addEdge("Basistha_Chariali", "Beltola_Bazar", 2.4);
addEdge("Survey", "Last_Gate", 4.5);
addEdge("Last_Gate", "Super_Market", 1.9);
addEdge("Super_Market", "Dispur", 2.3);
addEdge("Dispur", "Ganeshguri", 4.2);
addEdge("Ganeshguri", "Walford", 1.8);
addEdge("Walford", "Christianbasti", 1.3);
addEdge("Christianbasti", "Post_Office", 3);
addEdge("Post_Office", "ABC", 4.5);
addEdge("ABC", "Bhangagarh", 2.2);
addEdge("Bhangagarh", "Bora_Service", 2.1);
addEdge("Bora_Service", "Lachit_Nagar", 2.2);
addEdge("Lachit_Nagar", "Ulubari", 4.3);
addEdge("Ulubari", "Apsara", 2.3);
addEdge("Apsara", "Paltanbazar", 3.4);
addEdge("Paltanbazar", "Vishal_AT_Road", 2.1);
addEdge("Vishal_AT_Road", "Lakhtokia", 3.2);
addEdge("Lakhtokia", "Panbazar", 2.1);
addEdge("Panbazar", "Fancybazar", 4.1);
addEdge("Fancybazar", "Machkhowa", 3.8);
addEdge("Machkhowa", "Bharalumukh", 1.9);
addEdge("Church_Field", "Panbazar", 1.2);
addEdge("Fancybazar", "Machkhowa", 2.4);
addEdge("Machkhowa", "Bharalumukh", 3.2);
addEdge("Maligaon_Chariali", "Pandu", 1.6);
addEdge("Super_Market", "Last_Gate", 1.3);
addEdge("Lalganesh", "Powerhouse", 4.5);
addEdge("Powerhouse", "Dakhingaon", 3.1);
addEdge("Dakhingaon", "Jatia", 1.6);  // Corrected distance
addEdge("Jatia", "Ganesh_Mandir", 3.2);
addEdge("Ganesh_Mandir", "Ganeshguri", 1.2);
addEdge("Lakhtokia", "Panbazar", 2.3);
addEdge("Kamakhayagate", "Kamakhya_Mandir", 3.5);
addEdge("Gauhati_University", "Jalukbari", 7.5);
addEdge("Jalukbari", "Boragaon", 6.2);
addEdge("Boragaon", "Gorchuk", 5.6);
addEdge("Gorchuk", "Lokhra", 3.4);
addEdge("Lokhra", "Sarusajai", 0.6);
addEdge("Sarusajai", "Nalapara", 3.2);
addEdge("Nalapara", "Beharbari", 3.2);
addEdge("Beharbari", "Lalmati", 5.4);
addEdge("Lalmati", "Basistha_Chariali", 5.4);
addEdge("Narengi", "Forest_gate", 3.5);
addEdge("Forest_gate", "Sector_3", 2.3);
addEdge("Sector_3", "Marketing", 5.4);
addEdge("Marketing", "Noonmati", 3.2);
addEdge("Noonmati", "Bamunimaida", 6.3);
addEdge("Bamunimaida", "Anuradha", 3.2);
addEdge("Anuradha", "Chandmari", 4.3);
addEdge("Chandmari", "Silpukhuri", 1.2);
addEdge("Silpukhuri", "Guwahati_Club", 2.3);
addEdge("Guwahati_Club", "Reserve_Bank", 4.5);
addEdge("Reserve_Bank", "Lakhtokia", 2.3);
addEdge("Lakhtokia", "Panbazar", 2.3);
addEdge("Maligaon_Gate_3", "Maligaon_Chariali", 3.4);
addEdge("Maligaon_Chariali", "Adabari_Tiniali", 2.3);
addEdge("Adabari_Tiniali", "Jalukbari", 2.1);
addEdge("Zoo", "Ganeshguri", 6.4);  // Corrected distance
addEdge("Ganeshguri", "Dispur", 4.6);
addEdge("Gauhati_High_Court", "Silpukhuri", 5.3);
addEdge("Silpukhuri", "Zoo", 4.8);
addEdge("Bhangagarh", "Paltanbazar", 2.3);
addEdge("Airport", "Paltanbazar", 24);
addEdge("Jalukbari", "Boragaon", 6.2);
addEdge("Boragaon", "Beharbari", 7.1);
addEdge("Beharbari", "Lalmati", 3.3);
addEdge("Lalmati", "Basistha_Chariali", 5.1);
addEdge("Basistha_Chariali", "Khanapara", 3.9);

  
  const result = g.dijkstra("Airport","Panbazar");
  console.log(result); // Output: { path: [ 'A', 'C', 'D', 'F', 'E' ], distance: 8 }
  