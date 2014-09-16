(function() {
    var milestonesInVelocity = 6;

    angular.module('huburn').factory('velocityMetrics', function() {

        function getMetrics(milestones) {
          
          var metrics = {
            met: { value: 0, class: '' },
            points: { value: 0, class: '' },
            freeranges: { value: 0, class: '' },
            firelanes: { value: 0, class: '' },
            escalations: { value: 0, class: '' }
          };

          if (!milestones.length)
            return metrics;

          var velocityMilestones = milestones.slice (-milestonesInVelocity);

          metrics.met.value = velocityMilestones.filter(met).length;
          metrics.met.class = metClass(metrics.met.value);

          metrics.points.value = velocityMilestones.map(points).reduce(sum) / milestonesInVelocity;

          metrics.freeranges.value = velocityMilestones.map(freeranges).reduce(sum) / milestonesInVelocity;
          metrics.freeranges.class = freerangeClass(metrics.freeranges.value);

          metrics.firelanes.value = velocityMilestones.map(firelanes).reduce(sum) / milestonesInVelocity;
          metrics.firelanes.class = firelaneClass(metrics.firelanes.value);

          metrics.escalations.value = velocityMilestones.map(escalations).reduce(sum) / milestonesInVelocity;
          metrics.escalations.class = escalationClass(metrics.escalations.value);

          return metrics;
        };

        function getVelocityMilestones(data) { return data.slice(-milestonesInVelocity); };
        function sum(a,b) { return a+b; };
        function met(m) { return m.metadata.met; };
        function points(m) { return m.metadata.pointsEarned ? m.metadata.pointsEarned : m.metadata.points; };
        function freeranges(m) { return m.metadata.freeranges; };
        function firelanes(m) { return m.metadata.firelanes; };
        function escalations(m) { return m.metadata.escalations; };

        function metClass(value) {
          if (value == 6) return 'super-green';
          else if (value == 5) return 'green';
          else if (value == 4 || value == 3) return 'yellow';
          else return 'red';
        }

        function freerangeClass(value) {
          if (value >= 5) return 'super-green';
          else if (value >= 4) return 'green';
          else if (value >= 3) return 'yellow';
          else return 'red';
        }

        function firelaneClass(value) {
          if (value == 0) return 'super-green';
          else if (value <= 2 / milestonesInVelocity) return 'green';
          else if (value <= 3 / milestonesInVelocity) return 'yellow';
          else return 'red';
        }

        function escalationClass(value) {
          if (value < 1) return 'super-green';
          else if (value < 1.5) return 'green';
          else if (value < 2) return 'yellow';
          else return 'red';
        }

        return { getMetrics: getMetrics };

    });
})();