"use client";

import { useEffect } from "react";

export default function Bootstrap() {
  useEffect(() => {
    const Bootstrap = require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return null;
}