import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState({
    queued: 0,
    running: 0,
    completed: 0,
    dead: 0,
    workers: [],
  });

  const [jobs, setJobs] = useState([]);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const statsRes = await axios.get(
        "http://localhost:5000/api/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const jobsRes = await axios.get(
        "http://localhost:5000/api/jobs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(statsRes.data);
      setJobs(jobsRes.data.jobs || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <h1 className="title">
        🚀 Distributed Job Scheduler Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="cards">
        <div className="card yellow">
          <h3>Queued Jobs</h3>
          <h1>{stats.queued}</h1>
        </div>

        <div className="card blue">
          <h3>Running Jobs</h3>
          <h1>{stats.running}</h1>
        </div>

        <div className="card green">
          <h3>Completed Jobs</h3>
          <h1>{stats.completed}</h1>
        </div>

        <div className="card red">
          <h3>Dead Jobs</h3>
          <h1>{stats.dead}</h1>
        </div>
      </div>

      {/* Workers */}
      <div className="section">
        <h2>👷 Workers</h2>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Status</th>
                <th>Heartbeat</th>
              </tr>
            </thead>

            <tbody>
              {(stats.workers || []).map((worker) => (
                <tr key={worker.id}>
                  <td>{worker.id}</td>
                  <td>{worker.name}</td>
                  <td>
                    <span
                      className={`badge ${
                        worker.status === "ACTIVE"
                          ? "completed"
                          : "dead"
                      }`}
                    >
                      {worker.status}
                    </span>
                  </td>
                  <td>
                    {worker.heartbeat
                      ? new Date(
                          worker.heartbeat
                        ).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Jobs */}
      <div className="section">
        <h2>📋 Job Explorer</h2>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Retries</th>
                <th>Created At</th>
              </tr>
            </thead>

            <tbody>
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <tr key={job.id}>
                    <td>{job.id}</td>

                    <td>
                      <span
                        className={`badge ${job.status.toLowerCase()}`}
                      >
                        {job.status}
                      </span>
                    </td>

                    <td>{job.retryCount}</td>

                    <td>
                      {new Date(
                        job.createdAt
                      ).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">
                    No jobs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;