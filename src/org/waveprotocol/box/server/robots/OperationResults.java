/**
 * Copyright 2010 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

package org.waveprotocol.box.server.robots;

import com.google.wave.api.JsonRpcResponse;

import org.waveprotocol.wave.model.id.WaveletName;

import java.util.Map;

/**
 * Interface for accessing robot operation results.
 *
 * @author ljvderijk@google.com (Lennard de Rijk)
 */
public interface OperationResults {

  /**
   * Returns an unmodifiable view of all wavelets that have been opened when
   * performing robot operations.
   */
  Map<WaveletName, RobotWaveletData> getOpenWavelets();

  /**
   * Returns an unmodifiable view of all responses that have been generated by
   * performing robot operations.
   */
  Map<String, JsonRpcResponse> getResponses();

  /**
   * Returns a response for a specific robot operation.
   *
   * @param operationId the id of the robot operation to get the response for.
   * @return returns a {@link JsonRpcResponse} if set else null.
   */
  JsonRpcResponse getResponse(String operationId);
}