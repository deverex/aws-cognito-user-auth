"use strict";

const NginxParser = require("nginxparser");

const parser = new NginxParser(
  "$remote_addr - $remote_user [$time_local] " +
    '"$request" $status $body_bytes_sent "$http_referer" "$http_user_agent"'
);

// const ACCESS_LOGS_PATH =
//   "/home/devesh/Desktop/aws-cognito-user-auth/access.log";
const ACCESS_LOGS_PATH = "/var/log/nginx/access.log";

const applyFilter = (data, filters) => {
  let status = true;

  if (filters) {
    Object.keys(filters).map(filter => {
      if (filters[filter] && data[filter] !== filters[filter]) {
        status = false;
        return;
      }
    });
  }

  return status;
};

const getLogs = (query, callback) => {
  const logs = [];

  let appliedFilters = null;

  if (query) {
    const { ip_address: ip_str, status_code: status } = query;
    appliedFilters = { ip_str, status };
  }

  parser.read(
    ACCESS_LOGS_PATH,
    function (row) {
      if (applyFilter(row, appliedFilters)) {
        logs.push(row);
      }
    },
    function (err) {
      if (err) throw err;
      callback(null, { count: logs.length, data: logs });
    }
  );
};

module.exports = { getLogs };
